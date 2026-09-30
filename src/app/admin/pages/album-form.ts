import { Component, OnDestroy, inject, signal } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable, Subscription, filter, map } from 'rxjs';
import { AdminApi } from '../core/admin-api.service';
import { Feedback } from '../core/feedback.service';
import { AlbumPayload } from '../core/admin.model';
import { apiErrorMessage, apiFieldErrors } from '../core/api-error';
import { emptyToNull, slugify } from '../core/form-utils';
import { Album, AlbumItem, MediaType, thumbnailOf } from '../../models/gallery.model';
import { ImageKitPipe } from '../../pipes/imagekit.pipe';

const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];
const VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/quicktime'];
/** Plafonds alignés sur ceux de l'API (`ImageKitService`). */
const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
const MAX_VIDEO_SIZE = 100 * 1024 * 1024;

/** Fichier en file d'attente de téléversement. */
interface PendingUpload {
  name: string;
  type: MediaType;
  /** Pourcentage envoyé ; les photos, légères, n'en rapportent pas. */
  progress: number | null;
}

@Component({
  selector: 'admin-album-form',
  imports: [ReactiveFormsModule, RouterLink, ImageKitPipe],
  templateUrl: './album-form.html',
})
export default class AlbumForm implements OnDestroy {
  private readonly api = inject(AdminApi);
  private readonly feedback = inject(Feedback);
  private readonly router = inject(Router);
  private readonly fb = inject(NonNullableFormBuilder);

  protected readonly form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(255)]],
    slug: ['', Validators.maxLength(190)],
    takenOn: [''],
    description: [''],
    published: [true],
  });

  /** Photos et vidéos dans l'ordre du site ; la première sert de couverture. */
  protected readonly items = signal<AlbumItem[]>([]);
  protected readonly queue = signal<PendingUpload[]>([]);
  protected readonly id = signal<number | null>(null);
  protected readonly album = signal<Album | null>(null);
  protected readonly loading = signal(false);
  protected readonly saving = signal(false);
  protected readonly dragging = signal(false);
  protected readonly serverErrors = signal<Record<string, string>>({});
  protected readonly accepted = [...IMAGE_TYPES, ...VIDEO_TYPES].join(',');
  protected readonly thumbnailOf = thumbnailOf;

  private slugEdited = false;
  /** Fichiers téléversés depuis l'ouverture du formulaire et pas encore enregistrés. */
  private readonly unsaved = new Set<string>();
  private readonly uploads = new Subscription();

  constructor() {
    const idParam = inject(ActivatedRoute).snapshot.paramMap.get('id');
    if (idParam) {
      this.id.set(Number(idParam));
      this.slugEdited = true;
      this.loading.set(true);
      this.api.album(Number(idParam)).subscribe({
        next: (album) => this.fill(album),
        error: (err) => {
          this.feedback.error(apiErrorMessage(err, 'Album introuvable.'));
          this.router.navigateByUrl('/admin/galerie');
        },
      });
    }
    this.form.controls.title.valueChanges.subscribe((title) => {
      if (!this.slugEdited) {
        this.form.controls.slug.setValue(slugify(title), { emitEvent: false });
      }
    });
  }

  ngOnDestroy(): void {
    this.uploads.unsubscribe();
    // Formulaire quitté sans enregistrer : on ne laisse pas de fichiers orphelins sur ImageKit.
    this.unsaved.forEach((fileId) => this.api.deleteImage(fileId).subscribe({ error: () => {} }));
  }

  protected onSlugInput(): void {
    this.slugEdited = true;
  }

  // --- Téléversement ---------------------------------------------------------

  protected onPick(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.enqueue(Array.from(input.files ?? []));
    input.value = '';
  }

  protected onDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragging.set(false);
    this.enqueue(Array.from(event.dataTransfer?.files ?? []));
  }

  /** Vérifie les fichiers puis les téléverse un par un, dans l'ordre de sélection. */
  private enqueue(files: File[]): void {
    const rejected: string[] = [];
    const accepted = files.filter((file) => {
      const video = VIDEO_TYPES.includes(file.type);
      if (!video && !IMAGE_TYPES.includes(file.type)) {
        rejected.push(`${file.name} : format non pris en charge`);
        return false;
      }
      if (file.size > (video ? MAX_VIDEO_SIZE : MAX_IMAGE_SIZE)) {
        rejected.push(`${file.name} : trop lourd (${video ? '100' : '10'} Mo maximum)`);
        return false;
      }
      return true;
    });
    if (rejected.length) {
      this.feedback.error(rejected.join(' · '));
    }
    const idle = this.queue().length === 0;
    this.queue.update((queue) => [
      ...queue,
      ...accepted.map((file) => ({
        name: file.name,
        type: (VIDEO_TYPES.includes(file.type) ? 'video' : 'image') as MediaType,
        progress: null,
      })),
    ]);
    this.pendingFiles.push(...accepted);
    if (idle && accepted.length) {
      this.next();
    }
  }

  private readonly pendingFiles: File[] = [];

  private next(): void {
    const file = this.pendingFiles[0];
    if (!file) {
      return;
    }
    const type: MediaType = VIDEO_TYPES.includes(file.type) ? 'video' : 'image';
    const upload$: Observable<{ url: string; fileId: string } | null> =
      type === 'video'
        ? this.api.uploadVideo(file, 'galerie').pipe(
            map((event) => {
              if (event.type === HttpEventType.UploadProgress) {
                this.setProgress(Math.round((100 * event.loaded) / (event.total ?? file.size)));
              }
              return event.type === HttpEventType.Response ? event.body : null;
            }),
            filter((body) => body !== null),
          )
        : this.api.uploadImage(file, 'galerie');

    this.uploads.add(
      upload$.subscribe({
        next: (uploaded) => {
          if (uploaded) {
            this.unsaved.add(uploaded.fileId);
            this.items.update((items) => [
              ...items,
              { type, url: uploaded.url, fileId: uploaded.fileId, caption: null },
            ]);
          }
        },
        error: (err) => {
          this.feedback.error(`${file.name} : ${apiErrorMessage(err, 'le téléversement a échoué.')}`);
          this.done();
        },
        complete: () => this.done(),
      }),
    );
  }

  /** Retire le fichier terminé de la file et passe au suivant. */
  private done(): void {
    this.pendingFiles.shift();
    this.queue.update((queue) => queue.slice(1));
    this.next();
  }

  private setProgress(progress: number): void {
    this.queue.update((queue) => queue.map((entry, i) => (i === 0 ? { ...entry, progress } : entry)));
  }

  // --- Éléments de l'album ---------------------------------------------------

  protected setCaption(index: number, caption: string): void {
    this.items.update((items) => items.map((item, i) => (i === index ? { ...item, caption } : item)));
  }

  protected move(index: number, direction: -1 | 1): void {
    const target = index + direction;
    this.items.update((items) => {
      if (target < 0 || target >= items.length) {
        return items;
      }
      const copy = [...items];
      [copy[index], copy[target]] = [copy[target], copy[index]];
      return copy;
    });
  }

  /** Un fichier jamais enregistré est supprimé tout de suite ; les autres, à l'enregistrement. */
  protected removeItem(index: number): void {
    const item = this.items()[index];
    if (item?.fileId && this.unsaved.delete(item.fileId)) {
      this.api.deleteImage(item.fileId).subscribe({ error: () => {} });
    }
    this.items.update((items) => items.filter((_, i) => i !== index));
  }

  // --- Enregistrement --------------------------------------------------------

  protected save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.feedback.error('Complétez les champs obligatoires avant d’enregistrer.');
      return;
    }
    if (this.queue().length) {
      this.feedback.error('Attendez la fin des téléversements avant d’enregistrer.');
      return;
    }
    const v = this.form.getRawValue();
    const payload: AlbumPayload = {
      slug: emptyToNull(v.slug),
      title: v.title.trim(),
      description: emptyToNull(v.description),
      takenOn: v.takenOn || null,
      items: this.items().map((item) => ({ ...item, caption: emptyToNull(item.caption) })),
      published: v.published,
    };

    this.saving.set(true);
    this.serverErrors.set({});
    this.api.saveAlbum(this.id(), payload).subscribe({
      next: (album) => {
        this.saving.set(false);
        this.unsaved.clear();
        this.feedback.success('Album enregistré.');
        if (this.id() === null) {
          this.router.navigate(['/admin/galerie', album.id], { replaceUrl: true });
        }
        this.fill(album);
      },
      error: (err) => {
        this.saving.set(false);
        this.serverErrors.set(apiFieldErrors(err));
        this.feedback.error(apiErrorMessage(err));
      },
    });
  }

  protected async remove(): Promise<void> {
    const album = this.album();
    if (!album) {
      return;
    }
    const confirmed = await this.feedback.confirm({
      title: 'Supprimer cet album ?',
      message: `« ${album.title} » sera définitivement supprimé, avec ses photos et ses vidéos.`,
      confirmLabel: 'Supprimer',
      danger: true,
    });
    if (confirmed) {
      this.api.deleteAlbum(album.id).subscribe({
        next: () => {
          this.feedback.success('Album supprimé.');
          this.router.navigateByUrl('/admin/galerie');
        },
        error: (err) => this.feedback.error(apiErrorMessage(err)),
      });
    }
  }

  protected error(field: keyof typeof this.form.controls): string | null {
    const control = this.form.controls[field];
    if (control.touched && control.errors) {
      if (control.errors['required']) {
        return 'Champ obligatoire.';
      }
      if (control.errors['maxlength']) {
        return `${control.errors['maxlength'].requiredLength} caractères maximum.`;
      }
    }
    return this.serverErrors()[field] ?? null;
  }

  private fill(album: Album): void {
    this.id.set(album.id);
    this.album.set(album);
    this.loading.set(false);
    this.items.set(album.items);
    this.form.reset({
      title: album.title,
      slug: album.slug,
      takenOn: album.takenOn ?? '',
      description: album.description ?? '',
      published: album.published,
    });
  }
}
