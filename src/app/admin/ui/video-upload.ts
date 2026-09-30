import { Component, OnDestroy, forwardRef, inject, input, signal } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AdminApi } from '../core/admin-api.service';
import { ImageFolder, VideoRef } from '../core/admin.model';
import { apiErrorMessage } from '../core/api-error';

/** Plafond aligné sur celui de l'API (`ImageKitService.MAX_VIDEO_SIZE`). */
const MAX_SIZE = 100 * 1024 * 1024;
const ACCEPTED = ['video/mp4', 'video/webm', 'video/quicktime'];

/**
 * Champ de formulaire vidéo : téléverse un fichier vers ImageKit (via l'API) et expose
 * `{ url, fileId }` comme valeur.
 *
 * Même cycle de vie que {@link ImageUpload} : une vidéo téléversée ici puis remplacée, ou
 * abandonnée sans enregistrer, est supprimée d'ImageKit. Le formulaire parent appelle `commit()`
 * après un enregistrement réussi.
 */
@Component({
  selector: 'admin-video-upload',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => VideoUpload), multi: true },
  ],
  template: `
    <div class="flex flex-col gap-3">
      <div
        class="relative aspect-video overflow-hidden rounded-md border-2 border-dashed border-gray-300 bg-surface"
        [class.border-primary]="dragging()"
        (dragover)="$event.preventDefault(); dragging.set(true)"
        (dragleave)="dragging.set(false)"
        (drop)="onDrop($event)"
      >
        @if (value(); as video) {
          <video [src]="video.url" controls preload="metadata" playsinline class="h-full w-full bg-black object-contain"></video>
        } @else {
          <div
            class="flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-center text-sm text-foreground-muted"
          >
            <i class="pi pi-video text-3xl text-gray-400" aria-hidden="true"></i>
            <span>Déposez une vidéo ici, ou</span>
            <label class="admin-btn admin-btn-ghost cursor-pointer" [class.pointer-events-none]="disabled()">
              <i class="pi pi-upload" aria-hidden="true"></i> Téléverser
              <input
                type="file"
                class="sr-only"
                [accept]="accepted"
                [disabled]="disabled()"
                (change)="onPick($event)"
              />
            </label>
            <span class="text-xs">MP4, WebM ou MOV · 100 Mo max.</span>
          </div>
        }

        @if (progress() !== null) {
          <div
            class="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/90 px-8 text-sm font-semibold text-secondary"
          >
            <span>
              <i class="pi pi-spin pi-spinner mr-2" aria-hidden="true"></i>
              {{ progress() === 100 ? 'Traitement par ImageKit…' : 'Téléversement… ' + progress() + ' %' }}
            </span>
            <div
              class="h-1.5 w-full overflow-hidden rounded-full bg-gray-200"
              role="progressbar"
              aria-label="Progression du téléversement"
              [attr.aria-valuenow]="progress()"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <div class="h-full bg-primary transition-[width]" [style.width.%]="progress()"></div>
            </div>
          </div>
        }
      </div>

      @if (value()) {
        <div class="flex flex-wrap gap-2">
          <label
            class="admin-btn admin-btn-ghost cursor-pointer"
            [class.pointer-events-none]="disabled() || progress() !== null"
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
            class="admin-btn admin-btn-danger"
            [disabled]="disabled() || progress() !== null"
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
export class VideoUpload implements ControlValueAccessor, OnDestroy {
  private readonly api = inject(AdminApi);

  readonly folder = input<ImageFolder>('divers');

  protected readonly accepted = ACCEPTED.join(',');
  protected readonly value = signal<VideoRef | null>(null);
  /** Pourcentage envoyé, ou `null` hors téléversement. */
  protected readonly progress = signal<number | null>(null);
  protected readonly dragging = signal(false);
  protected readonly disabled = signal(false);
  protected readonly error = signal<string | null>(null);

  /** Vidéos téléversées depuis l'ouverture du formulaire et pas encore enregistrées. */
  private readonly unsaved = new Set<string>();
  private upload$?: Subscription;
  private onChange: (value: VideoRef | null) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: VideoRef | null): void {
    this.value.set(value?.url ? value : null);
  }

  registerOnChange(fn: (value: VideoRef | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled.set(disabled);
  }

  /** La vidéo courante est désormais enregistrée : elle ne doit plus être nettoyée. */
  commit(): void {
    this.unsaved.clear();
  }

  ngOnDestroy(): void {
    this.upload$?.unsubscribe();
    // Formulaire quitté sans enregistrer : on ne laisse pas de vidéos orphelines sur ImageKit.
    this.unsaved.forEach((fileId) => this.api.deleteVideo(fileId).subscribe({ error: () => {} }));
  }

  protected onPick(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (file) {
      this.upload(file);
    }
  }

  protected onDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragging.set(false);
    const file = event.dataTransfer?.files[0];
    if (file && !this.disabled() && this.progress() === null) {
      this.upload(file);
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
      this.error.set('Vidéo trop lourde (100 Mo maximum).');
      return;
    }
    this.progress.set(0);
    this.upload$ = this.api.uploadVideo(file, this.folder()).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress.set(Math.round((100 * event.loaded) / (event.total ?? file.size)));
        } else if (event.type === HttpEventType.Response && event.body) {
          const video = event.body;
          this.discardIfUnsaved(this.value());
          this.unsaved.add(video.fileId);
          this.progress.set(null);
          this.update({ url: video.url, fileId: video.fileId });
        }
      },
      error: (err) => {
        this.progress.set(null);
        this.error.set(apiErrorMessage(err, 'Le téléversement a échoué.'));
      },
    });
  }

  private discardIfUnsaved(video: VideoRef | null): void {
    if (video?.fileId && this.unsaved.delete(video.fileId)) {
      this.api.deleteVideo(video.fileId).subscribe({ error: () => {} });
    }
  }

  private update(value: VideoRef | null): void {
    this.value.set(value);
    this.onChange(value);
    this.onTouched();
  }
}
