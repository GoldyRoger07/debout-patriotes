import { Component, computed, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { Container } from '../../components/container/container';
import { EmptyState } from '../../components/empty-state/empty-state';
import { LanguageService } from '../../services/language.service';
import { Album as AlbumData, thumbnailOf } from '../../models/gallery.model';
import { ImageKitPipe } from '../../pipes/imagekit.pipe';
import { PosterFallback } from '../../directives/poster-fallback';
import { LocalizePipe } from '../../pipes/localize.pipe';

/**
 * Album de la galerie : `/galerie/:slug`. Données chargées par le résolveur de la route.
 * Chaque photo ou vidéo s'ouvre en grand dans une visionneuse (flèches du clavier, Échap).
 */
@Component({
  selector: 'app-album',
  imports: [Container, EmptyState, RouterLink, DatePipe, ImageKitPipe, PosterFallback, LocalizePipe],
  templateUrl: './album.html',
  host: { '(document:keydown)': 'onKey($event)' },
})
export default class Album {
  private readonly content = inject(LanguageService).content;
  protected readonly language = inject(LanguageService).language;

  protected readonly album = toSignal(
    inject(ActivatedRoute).data.pipe(map((data) => data['album'] as AlbumData | null)),
  );
  protected readonly labels = computed(() => this.content().gallery);
  protected readonly thumbnailOf = thumbnailOf;

  /** Élément ouvert dans la visionneuse, `null` quand elle est fermée. */
  protected readonly opened = signal<number | null>(null);
  protected readonly current = computed(() => {
    const index = this.opened();
    return index === null ? null : (this.album()?.items[index] ?? null);
  });

  protected open(index: number): void {
    this.opened.set(index);
  }

  protected close(): void {
    this.opened.set(null);
  }

  /** Passe à l'élément voisin, en bouclant d'un bout à l'autre de l'album. */
  protected step(direction: -1 | 1): void {
    const index = this.opened();
    const count = this.album()?.items.length ?? 0;
    if (index !== null && count) {
      this.opened.set((index + direction + count) % count);
    }
  }

  protected onKey(event: KeyboardEvent): void {
    if (this.opened() === null) {
      return;
    }
    if (event.key === 'Escape') {
      this.close();
    } else if (event.key === 'ArrowLeft') {
      this.step(-1);
    } else if (event.key === 'ArrowRight') {
      this.step(1);
    }
  }
}
