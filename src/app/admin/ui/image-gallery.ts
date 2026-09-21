import { Component, DestroyRef, OnInit, inject, input, output, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { AdminApi, GALLERY_PAGE_SIZE } from '../core/admin-api.service';
import { Feedback } from '../core/feedback.service';
import { apiErrorMessage } from '../core/api-error';
import { GalleryImage, ImageFolder } from '../core/admin.model';
import { ImageKitPipe } from '../../pipes/imagekit.pipe';

const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];
const MAX_SIZE = 10 * 1024 * 1024;

const FOLDERS: { label: string; value: ImageFolder }[] = [
  { label: 'Articles', value: 'blog' },
  { label: 'Candidats', value: 'candidats' },
  { label: 'Divers', value: 'divers' },
];

/**
 * Médiathèque ImageKit : parcours d'un dossier, recherche, ajout et ménage.
 *
 * Utilisée telle quelle par la page « Médiathèque », et dans une fenêtre modale
 * (`admin-image-picker`) pour choisir l'illustration d'un article ou d'un candidat.
 */
@Component({
  selector: 'admin-image-gallery',
  imports: [ImageKitPipe],
  template: `
    <div class="flex flex-wrap items-center gap-3">
      <div class="flex rounded-md bg-surface p-0.5 text-sm font-semibold ring-1 ring-gray-200">
        @for (tab of folders; track tab.value) {
          <button
            type="button"
            class="rounded px-3 py-1.5"
            [class]="
              folder() === tab.value
                ? 'bg-secondary text-white'
                : 'text-foreground-muted hover:text-secondary'
            "
            (click)="setFolder(tab.value)"
          >
            {{ tab.label }}
          </button>
        }
      </div>

      <div class="relative min-w-52 flex-1">
        <i
          class="pi pi-search absolute top-1/2 left-3 -translate-y-1/2 text-sm text-gray-400"
          aria-hidden="true"
        ></i>
        <input
          class="admin-input pl-9"
          type="search"
          placeholder="Rechercher par nom de fichier…"
          aria-label="Rechercher une image"
          (input)="onSearch($any($event.target).value)"
        />
      </div>

      <label
        class="admin-btn admin-btn-primary cursor-pointer"
        [class.pointer-events-none]="uploading()"
      >
        <i
          class="pi"
          [class]="uploading() ? 'pi-spin pi-spinner' : 'pi-upload'"
          aria-hidden="true"
        ></i>
        {{ uploading() ? 'Téléversement…' : 'Ajouter des images' }}
        <input type="file" class="sr-only" multiple [accept]="accepted" (change)="onPick($event)" />
      </label>
    </div>

    @if (error(); as message) {
      <p class="mt-3 text-sm text-danger" role="alert">{{ message }}</p>
    }

    <div
      class="mt-4 rounded-lg border-2 border-dashed p-3"
      [class]="dragging() ? 'border-primary bg-primary/5' : 'border-transparent'"
      (dragover)="$event.preventDefault(); dragging.set(true)"
      (dragleave)="dragging.set(false)"
      (drop)="onDrop($event)"
    >
      @if (loading()) {
        <p class="py-16 text-center text-foreground-muted">
          <i class="pi pi-spin pi-spinner" aria-hidden="true"></i>
        </p>
      } @else if (images().length) {
        <ul class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          @for (image of images(); track image.fileId) {
            <li class="group relative">
              <button
                type="button"
                class="block w-full overflow-hidden rounded-md border-2 bg-surface"
                [class]="
                  selected()?.fileId === image.fileId
                    ? 'border-primary ring-2 ring-primary/30'
                    : 'border-gray-200 hover:border-primary/60'
                "
                [attr.aria-pressed]="selected()?.fileId === image.fileId"
                (click)="select(image)"
                (dblclick)="confirmSelection()"
              >
                <img
                  [src]="image.url | ik: 'w-400,h-400,c-at_max'"
                  [alt]="image.name"
                  loading="lazy"
                  class="aspect-square w-full bg-white object-contain"
                />
                <span class="block truncate px-2 py-1.5 text-left text-xs text-foreground-muted">{{
                  image.name
                }}</span>
              </button>

              @if (image.inUse) {
                <span
                  class="pointer-events-none absolute top-1.5 left-1.5 rounded bg-secondary/90 px-1.5 py-0.5 text-[10px] font-semibold text-white"
                  title="Cette image illustre déjà un contenu"
                >
                  Utilisée
                </span>
              }

              <button
                type="button"
                class="absolute top-1.5 right-1.5 rounded bg-white/90 p-1.5 text-foreground-muted opacity-0 group-hover:opacity-100 focus:opacity-100 hover:text-danger"
                [title]="
                  image.inUse
                    ? 'Image utilisée : retirez-la du contenu avant de la supprimer'
                    : 'Supprimer de la médiathèque'
                "
                (click)="remove(image)"
              >
                <i class="pi pi-trash text-xs" aria-hidden="true"></i>
                <span class="sr-only">Supprimer {{ image.name }}</span>
              </button>
            </li>
          }
        </ul>

        @if (more()) {
          <p class="mt-4 text-center">
            <button
              type="button"
              class="admin-btn admin-btn-ghost"
              [disabled]="loadingMore()"
              (click)="loadMore()"
            >
              <i
                class="pi"
                [class]="loadingMore() ? 'pi-spin pi-spinner' : 'pi-chevron-down'"
                aria-hidden="true"
              ></i>
              Charger plus
            </button>
          </p>
        }
      } @else {
        <p class="py-16 text-center text-sm text-foreground-muted">
          @if (query()) {
            Aucune image ne correspond à « {{ query() }} ».
          } @else {
            Ce dossier est vide. Ajoutez une image, ou déposez-la ici.
          }
        </p>
      }
    </div>
  `,
})
export class ImageGallery implements OnInit {
  private readonly api = inject(AdminApi);
  private readonly feedback = inject(Feedback);
  private readonly search$ = new Subject<string>();
  private request?: Subscription;

  /** Dossier ouvert au premier affichage. */
  readonly startFolder = input<ImageFolder>('divers');
  /** Émis quand une image est validée (double-clic, ou `confirmSelection()` depuis le parent). */
  readonly chosen = output<GalleryImage>();

  protected readonly folders = FOLDERS;
  protected readonly accepted = ACCEPTED.join(',');
  protected readonly folder = signal<ImageFolder>('divers');
  protected readonly query = signal('');
  protected readonly images = signal<GalleryImage[]>([]);
  protected readonly loading = signal(true);
  protected readonly loadingMore = signal(false);
  protected readonly uploading = signal(false);
  protected readonly dragging = signal(false);
  protected readonly error = signal<string | null>(null);
  /** Une page pleine : il reste probablement des images à charger. */
  protected readonly more = signal(false);

  /** Image mise en évidence, que le parent peut lire pour la valider. */
  readonly selected = signal<GalleryImage | null>(null);

  constructor() {
    this.search$.pipe(debounceTime(300), takeUntilDestroyed()).subscribe((q) => {
      this.query.set(q);
      this.load();
    });
    inject(DestroyRef).onDestroy(() => this.request?.unsubscribe());
  }

  ngOnInit(): void {
    this.folder.set(this.startFolder());
    this.load();
  }

  /** Valide l'image en évidence : le parent referme la fenêtre. */
  confirmSelection(): void {
    const image = this.selected();
    if (image) {
      this.chosen.emit(image);
    }
  }

  protected setFolder(folder: ImageFolder): void {
    if (folder !== this.folder()) {
      this.folder.set(folder);
      this.load();
    }
  }

  protected onSearch(value: string): void {
    this.search$.next(value.trim());
  }

  protected select(image: GalleryImage): void {
    this.selected.set(this.selected()?.fileId === image.fileId ? null : image);
  }

  protected loadMore(): void {
    this.loadingMore.set(true);
    this.fetch(this.images().length, (page) => {
      this.images.update((list) => [...list, ...page]);
      this.loadingMore.set(false);
    });
  }

  protected onPick(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    input.value = '';
    this.upload(files);
  }

  protected onDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragging.set(false);
    this.upload(Array.from(event.dataTransfer?.files ?? []));
  }

  protected async remove(image: GalleryImage): Promise<void> {
    if (image.inUse) {
      this.feedback.error(
        `« ${image.name} » illustre déjà un contenu : retirez-la de ce contenu avant de la supprimer.`,
      );
      return;
    }
    const confirmed = await this.feedback.confirm({
      title: 'Supprimer cette image ?',
      message: `« ${image.name} » sera définitivement retirée de la médiathèque.`,
      confirmLabel: 'Supprimer',
      danger: true,
    });
    if (!confirmed) {
      return;
    }
    this.api.deleteImage(image.fileId).subscribe({
      next: () => {
        this.images.update((list) => list.filter((i) => i.fileId !== image.fileId));
        if (this.selected()?.fileId === image.fileId) {
          this.selected.set(null);
        }
        this.feedback.success('Image supprimée.');
      },
      error: (err) =>
        this.feedback.error(apiErrorMessage(err, "L'image n'a pas pu être supprimée.")),
    });
  }

  private load(): void {
    this.loading.set(true);
    this.selected.set(null);
    this.fetch(0, (page) => {
      this.images.set(page);
      this.loading.set(false);
    });
  }

  private fetch(skip: number, apply: (page: GalleryImage[]) => void): void {
    this.request?.unsubscribe();
    this.error.set(null);
    this.request = this.api.images({ folder: this.folder(), q: this.query(), skip }).subscribe({
      next: (page) => {
        this.more.set(page.length === GALLERY_PAGE_SIZE);
        apply(page);
      },
      error: (err) => {
        this.loading.set(false);
        this.loadingMore.set(false);
        this.error.set(apiErrorMessage(err, "La médiathèque n'a pas pu être chargée."));
      },
    });
  }

  private upload(files: File[]): void {
    const accepted = files.filter((file) => ACCEPTED.includes(file.type) && file.size <= MAX_SIZE);
    if (!accepted.length) {
      if (files.length) {
        this.error.set('Formats acceptés : JPEG, PNG, WebP, GIF ou AVIF, 10 Mo maximum.');
      }
      return;
    }
    if (accepted.length < files.length) {
      this.error.set(
        `${files.length - accepted.length} fichier(s) ignoré(s) : format non pris en charge ou trop lourd.`,
      );
    }

    this.uploading.set(true);
    let pending = accepted.length;
    const folder = this.folder();
    const done = () => {
      if (--pending === 0) {
        this.uploading.set(false);
      }
    };

    accepted.forEach((file) => {
      this.api.uploadImage(file, folder).subscribe({
        next: (image) => {
          // Ajoutée en tête : l'inventaire est trié du plus récent au plus ancien.
          const added: GalleryImage = { ...image, folder, inUse: false };
          this.images.update((list) => [added, ...list]);
          this.selected.set(added);
          done();
        },
        error: (err) => {
          this.error.set(apiErrorMessage(err, `Le téléversement de « ${file.name} » a échoué.`));
          done();
        },
      });
    });
  }
}
