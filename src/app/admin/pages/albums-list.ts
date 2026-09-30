import { Component, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminApi } from '../core/admin-api.service';
import { Feedback } from '../core/feedback.service';
import { apiErrorMessage } from '../core/api-error';
import { AlbumSummary, thumbnailOf } from '../../models/gallery.model';
import { ImageKitPipe } from '../../pipes/imagekit.pipe';

/** Albums de la galerie, du plus récent au plus ancien (ordre du site). */
@Component({
  selector: 'admin-albums-list',
  imports: [RouterLink, DatePipe, ImageKitPipe],
  template: `
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 class="font-heading text-2xl font-extrabold text-secondary">Galerie</h1>
        <p class="mt-1 text-sm text-foreground-muted">
          Albums de photos et de vidéos affichés sur la page « Galerie », du plus récent au plus ancien.
        </p>
      </div>
      <a routerLink="/admin/galerie/nouveau" class="admin-btn admin-btn-primary">
        <i class="pi pi-plus" aria-hidden="true"></i> Nouvel album
      </a>
    </div>

    <div class="mt-8 overflow-hidden rounded-lg border border-gray-200 bg-white">
      @if (albums(); as list) {
        @if (list.length) {
          <ul class="divide-y divide-gray-100">
            @for (album of list; track album.id) {
              <li class="flex items-center gap-4 p-4" [class.opacity-60]="!album.published">
                <div class="hidden h-14 w-20 shrink-0 overflow-hidden rounded bg-surface sm:block">
                  @if (album.cover; as cover) {
                    <img [src]="thumbnailOf(cover) | ik: 'w-160,h-112' : 'auto'" alt="" class="h-full w-full object-cover" />
                  } @else {
                    <div class="flex h-full items-center justify-center text-gray-300">
                      <i class="pi pi-images" aria-hidden="true"></i>
                    </div>
                  }
                </div>

                <div class="min-w-0 flex-1">
                  <a [routerLink]="['/admin/galerie', album.id]" class="block truncate font-semibold text-secondary hover:text-primary">
                    {{ album.title }}
                  </a>
                  <p class="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-foreground-muted">
                    @if (!album.published) {
                      <span class="rounded-full bg-gray-100 px-2 py-0.5 font-semibold text-gray-600">Masqué</span>
                    }
                    @if (album.takenOn) {
                      <span>{{ album.takenOn | date: 'd MMM y' : 'UTC' }}</span>
                    }
                    <span><i class="pi pi-image mr-1 text-[10px]" aria-hidden="true"></i>{{ album.photoCount }}</span>
                    <span><i class="pi pi-video mr-1 text-[10px]" aria-hidden="true"></i>{{ album.videoCount }}</span>
                  </p>
                </div>

                <div class="flex shrink-0 items-center gap-1">
                  @if (album.published) {
                    <a
                      [href]="'/galerie/' + album.slug"
                      target="_blank"
                      rel="noopener"
                      class="rounded p-2 text-foreground-muted hover:bg-gray-100 hover:text-secondary"
                      title="Voir sur le site"
                    >
                      <i class="pi pi-eye" aria-hidden="true"></i><span class="sr-only">Voir sur le site</span>
                    </a>
                  }
                  <a
                    [routerLink]="['/admin/galerie', album.id]"
                    class="rounded p-2 text-foreground-muted hover:bg-gray-100 hover:text-secondary"
                    title="Modifier"
                  >
                    <i class="pi pi-pencil" aria-hidden="true"></i><span class="sr-only">Modifier</span>
                  </a>
                  <button
                    type="button"
                    class="rounded p-2 text-foreground-muted hover:bg-red-50 hover:text-danger"
                    title="Supprimer"
                    (click)="remove(album)"
                  >
                    <i class="pi pi-trash" aria-hidden="true"></i><span class="sr-only">Supprimer</span>
                  </button>
                </div>
              </li>
            }
          </ul>
        } @else {
          <div class="p-12 text-center text-sm text-foreground-muted">
            <i class="pi pi-images mb-3 text-3xl text-gray-300" aria-hidden="true"></i>
            <p>Aucun album pour le moment.</p>
          </div>
        }
      } @else {
        <div class="p-12 text-center text-foreground-muted">
          <i class="pi pi-spin pi-spinner" aria-hidden="true"></i>
        </div>
      }
    </div>
  `,
})
export default class AlbumsList {
  private readonly api = inject(AdminApi);
  private readonly feedback = inject(Feedback);

  protected readonly albums = signal<AlbumSummary[] | null>(null);
  protected readonly thumbnailOf = thumbnailOf;

  constructor() {
    this.load();
  }

  protected async remove(album: AlbumSummary): Promise<void> {
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
          this.load();
        },
        error: (err) => this.feedback.error(apiErrorMessage(err)),
      });
    }
  }

  private load(): void {
    this.api.albums().subscribe({
      next: (albums) => this.albums.set(albums),
      error: (err) => {
        this.albums.set([]);
        this.feedback.error(apiErrorMessage(err));
      },
    });
  }
}
