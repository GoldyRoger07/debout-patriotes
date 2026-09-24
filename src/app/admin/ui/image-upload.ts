import { Component, OnDestroy, computed, forwardRef, inject, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AdminApi } from '../core/admin-api.service';
import { ImageFolder, ImageRef } from '../core/admin.model';
import { ImagePicker } from '../core/image-picker.service';
import { apiErrorMessage } from '../core/api-error';
import { ImageKitPipe } from '../../pipes/imagekit.pipe';
import { DEFAULT_FOCUS, FOCUS_OPTIONS, ImageFocus } from '../../models/image.model';

const MAX_SIZE = 10 * 1024 * 1024;
const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];

/** Largeur de l'aperçu : la hauteur en découle, pour respecter la proportion de l'emplacement. */
const PREVIEW_WIDTH = 800;

/**
 * Champ de formulaire image : téléverse un fichier vers ImageKit (via l'API) ou reprend une image
 * déjà présente dans la médiathèque, et expose `{ url, fileId, focus }` comme valeur.
 *
 * L'aperçu reprend la proportion exacte de l'emplacement sur le site (`ratio`) et applique le
 * cadrage choisi : ce qui est affiché ici est ce qui sera affiché là-bas.
 *
 * Une image *téléversée ici* puis remplacée, ou abandonnée sans enregistrer, est supprimée
 * d'ImageKit ; une image choisie dans la médiathèque y reste, puisqu'elle ne nous appartient pas.
 * Le formulaire parent appelle `commit()` après un enregistrement réussi.
 */
@Component({
  selector: 'admin-image-upload',
  imports: [ImageKitPipe],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ImageUpload), multi: true },
  ],
  template: `
    <div class="flex flex-col gap-3">
      <div
        class="relative overflow-hidden rounded-md border-2 border-dashed border-gray-300 bg-surface"
        [style.aspect-ratio]="ratio()"
        [class.border-primary]="dragging()"
        (dragover)="$event.preventDefault(); dragging.set(true)"
        (dragleave)="dragging.set(false)"
        (drop)="onDrop($event)"
      >
        @if (value(); as image) {
          <img
            [src]="image.url | ik: previewTransformation() : image.focus"
            alt="Aperçu"
            class="h-full w-full object-cover"
          />
        } @else {
          <div
            class="flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-center text-sm text-foreground-muted"
          >
            <i class="pi pi-image text-3xl text-gray-400" aria-hidden="true"></i>
            <span>Déposez une image ici, ou</span>
            <span class="flex flex-wrap justify-center gap-2">
              <label
                class="admin-btn admin-btn-ghost cursor-pointer"
                [class.pointer-events-none]="disabled()"
              >
                <i class="pi pi-upload" aria-hidden="true"></i> Téléverser
                <input
                  type="file"
                  class="sr-only"
                  [accept]="accepted"
                  [disabled]="disabled()"
                  (change)="onPick($event)"
                />
              </label>
              <button
                type="button"
                class="admin-btn admin-btn-ghost"
                [disabled]="disabled()"
                (click)="pickFromGallery()"
              >
                <i class="pi pi-images" aria-hidden="true"></i> Médiathèque
              </button>
            </span>
            <span class="text-xs">JPEG, PNG, WebP, GIF ou AVIF · 10 Mo max.</span>
          </div>
        }

        @if (uploading()) {
          <div
            class="absolute inset-0 flex items-center justify-center bg-white/80 text-sm font-semibold text-secondary"
          >
            <i class="pi pi-spin pi-spinner mr-2" aria-hidden="true"></i> Téléversement…
          </div>
        }
      </div>

      @if (value(); as image) {
        <!-- Cadrage : la proportion de l'emplacement ne bouge pas, seul change ce qu'on en garde. -->
        <fieldset>
          <legend class="admin-label">Cadrage de l’image</legend>
          <div class="flex flex-wrap gap-1.5">
            @for (option of focusOptions; track option.value) {
              <button
                type="button"
                class="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-semibold transition-colors disabled:opacity-40"
                [class]="
                  image.focus === option.value
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-gray-300 text-foreground-muted hover:border-primary/40 hover:text-secondary'
                "
                [attr.aria-pressed]="image.focus === option.value"
                [title]="option.hint"
                [disabled]="disabled()"
                (click)="setFocus(option.value)"
              >
                <i class="pi" [class]="option.icon" aria-hidden="true"></i> {{ option.label }}
              </button>
            }
          </div>
          <p class="mt-2 text-xs text-foreground-muted">{{ focusHint() }}</p>
        </fieldset>

        <div class="flex flex-wrap gap-2">
          <label
            class="admin-btn admin-btn-ghost cursor-pointer"
            [class.pointer-events-none]="disabled()"
          >
            <i class="pi pi-upload" aria-hidden="true"></i> Remplacer
            <input
              type="file"
              class="sr-only"
              [accept]="accepted"
              [disabled]="disabled()"
              (change)="onPick($event)"
            />
          </label>
          <button
            type="button"
            class="admin-btn admin-btn-ghost"
            [disabled]="disabled()"
            (click)="pickFromGallery()"
          >
            <i class="pi pi-images" aria-hidden="true"></i> Médiathèque
          </button>
          <button
            type="button"
            class="admin-btn admin-btn-danger"
            [disabled]="disabled()"
            (click)="remove()"
          >
            <i class="pi pi-trash" aria-hidden="true"></i> Retirer
          </button>
        </div>
      }

      @if (error()) {
        <p class="text-sm text-danger" role="alert">{{ error() }}</p>
      }
    </div>
  `,
})
export class ImageUpload implements ControlValueAccessor, OnDestroy {
  private readonly api = inject(AdminApi);
  private readonly picker = inject(ImagePicker);

  readonly folder = input<ImageFolder>('divers');
  /** Proportion de l'emplacement sur le site, façon CSS : `'16/9'`, `'4/5'`… */
  readonly ratio = input('16/9');
  /** Cadrage appliqué à une image qui vient d'être choisie, ou enregistrée avant ce réglage. */
  readonly defaultFocus = input<ImageFocus>(DEFAULT_FOCUS);

  protected readonly accepted = ACCEPTED.join(',');
  protected readonly focusOptions = FOCUS_OPTIONS;
  protected readonly value = signal<ImageRef | null>(null);
  protected readonly uploading = signal(false);
  protected readonly dragging = signal(false);
  protected readonly disabled = signal(false);
  protected readonly error = signal<string | null>(null);

  /** Boîte de l'aperçu, à la proportion exacte de l'emplacement sur le site. */
  protected readonly previewTransformation = computed(() => {
    const [width, height] = this.ratio().split('/').map(Number);
    return `w-${PREVIEW_WIDTH},h-${Math.round((PREVIEW_WIDTH * height) / width)}`;
  });

  protected readonly focusHint = computed(
    () => FOCUS_OPTIONS.find((option) => option.value === this.value()?.focus)?.hint ?? '',
  );

  /** Images téléversées depuis l'ouverture du formulaire et pas encore enregistrées. */
  private readonly unsaved = new Set<string>();
  private onChange: (value: ImageRef | null) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: ImageRef | null): void {
    this.value.set(value?.url ? { ...value, focus: value.focus ?? this.defaultFocus() } : null);
  }

  registerOnChange(fn: (value: ImageRef | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled.set(disabled);
  }

  /** L'image courante est désormais enregistrée : elle ne doit plus être nettoyée. */
  commit(): void {
    this.unsaved.clear();
  }

  ngOnDestroy(): void {
    // Formulaire quitté sans enregistrer : on ne laisse pas d'images orphelines sur ImageKit.
    this.unsaved.forEach((fileId) => this.api.deleteImage(fileId).subscribe({ error: () => {} }));
  }

  protected onPick(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (file) {
      this.upload(file);
    }
  }

  /** Reprend une image déjà en ligne : elle appartient à la médiathèque, pas au formulaire. */
  protected async pickFromGallery(): Promise<void> {
    const image = await this.picker.open(this.folder(), 'Choisir une image dans la médiathèque');
    if (image) {
      this.error.set(null);
      const focus = this.value()?.focus ?? this.defaultFocus();
      this.discardIfUnsaved(this.value());
      this.update({ url: image.url, fileId: image.fileId, focus });
    }
  }

  protected onDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragging.set(false);
    const file = event.dataTransfer?.files[0];
    if (file && !this.disabled()) {
      this.upload(file);
    }
  }

  /** Change le cadrage sans toucher à l'image : l'aperçu montre aussitôt le résultat. */
  protected setFocus(focus: ImageFocus): void {
    const image = this.value();
    if (image && image.focus !== focus) {
      this.update({ ...image, focus });
    }
  }

  protected remove(): void {
    this.discardIfUnsaved(this.value());
    this.update(null);
  }

  private upload(file: File): void {
    this.error.set(null);
    if (!ACCEPTED.includes(file.type)) {
      this.error.set('Format non pris en charge.');
      return;
    }
    if (file.size > MAX_SIZE) {
      this.error.set('Image trop lourde (10 Mo maximum).');
      return;
    }
    this.uploading.set(true);
    this.api.uploadImage(file, this.folder()).subscribe({
      next: (image) => {
        // Une image qui en remplace une autre garde le cadrage déjà réglé pour cet emplacement.
        const focus = this.value()?.focus ?? this.defaultFocus();
        this.discardIfUnsaved(this.value());
        this.unsaved.add(image.fileId);
        this.uploading.set(false);
        this.update({ url: image.url, fileId: image.fileId, focus });
      },
      error: (err) => {
        this.uploading.set(false);
        this.error.set(apiErrorMessage(err, 'Le téléversement a échoué.'));
      },
    });
  }

  private discardIfUnsaved(image: ImageRef | null): void {
    if (image?.fileId && this.unsaved.delete(image.fileId)) {
      this.api.deleteImage(image.fileId).subscribe({ error: () => {} });
    }
  }

  private update(value: ImageRef | null): void {
    this.value.set(value);
    this.onChange(value);
    this.onTouched();
  }
}
