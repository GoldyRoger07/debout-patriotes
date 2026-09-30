import { Component, computed, input } from '@angular/core';
import { videoThumbnail } from '../../models/gallery.model';
import { ImageKitPipe } from '../../pipes/imagekit.pipe';

/**
 * Lecteur d'une vidéo hébergée sur ImageKit, au format 16/9 : une vidéo verticale (tournée au
 * téléphone) y entre en entier, complétée par des bandes noires.
 *
 * Rien n'est téléchargé avant que le visiteur ne lance la lecture (`preload="none"`) : l'affiche
 * suffit à la page. Sans affiche fournie, ImageKit en extrait une de la vidéo.
 *
 * @see https://imagekit.io/docs/create-video-thumbnails
 */
@Component({
  selector: 'my-video-player',
  template: `
    <video
      [src]="src()"
      [attr.poster]="poster()"
      [attr.aria-label]="label()"
      controls
      preload="none"
      playsinline
      class="aspect-video w-full rounded-md bg-black object-contain shadow-card"
    ></video>
  `,
})
export class VideoPlayer {
  readonly src = input.required<string>();
  readonly label = input<string>();
  /** Affiche déjà transformée (URL finale), par exemple la couverture d'un article. */
  readonly posterUrl = input<string | null>();

  private readonly thumbnail = new ImageKitPipe();

  protected readonly poster = computed(
    () => this.posterUrl() ?? this.thumbnail.transform(videoThumbnail(this.src()), 'w-1280'),
  );
}
