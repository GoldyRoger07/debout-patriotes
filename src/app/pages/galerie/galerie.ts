import { Component, computed, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Container } from '../../components/container/container';
import { PageHeader } from '../../components/page-header/page-header';
import { EmptyState } from '../../components/empty-state/empty-state';
import { LanguageService } from '../../services/language.service';
import { GalleryApi } from '../../services/gallery-api.service';
import { AlbumSummary, thumbnailOf } from '../../models/gallery.model';
import { ImageKitPipe } from '../../pipes/imagekit.pipe';
import { LocalizePipe } from '../../pipes/localize.pipe';

/** Galerie : les albums publiés, photos et vidéos, du plus récent au plus ancien. */
@Component({
  selector: 'app-galerie',
  imports: [Container, PageHeader, EmptyState, RouterLink, DatePipe, ImageKitPipe, LocalizePipe],
  templateUrl: './galerie.html',
})
export default class Galerie {
  private readonly content = inject(LanguageService).content;
  protected readonly language = inject(LanguageService).language;

  protected readonly page = computed(() => this.content().gallery);
  /** `undefined` pendant le chargement. */
  protected readonly albums = toSignal(inject(GalleryApi).list());
  protected readonly thumbnailOf = thumbnailOf;

  /** « 12 photos · 2 vidéos », sans les nombres nuls. */
  protected counts(album: AlbumSummary): string {
    const p = this.page();
    return [
      album.photoCount ? `${album.photoCount} ${album.photoCount > 1 ? p.photos : p.photo}` : '',
      album.videoCount ? `${album.videoCount} ${album.videoCount > 1 ? p.videos : p.video}` : '',
    ]
      .filter(Boolean)
      .join(' · ');
  }
}
