import { Directive, ElementRef, PLATFORM_ID, effect, inject, input } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/** Affiche de secours d'une vidéo, aux couleurs du site (`public/img`). */
export const VIDEO_POSTER_FALLBACK = '/img/video-poster.svg';

/**
 * Remplace par l'affiche de secours une image qui ne se charge pas.
 *
 * - `<img myPosterFallback>` : vignette d'une vidéo (galerie, album, back-office).
 * - `<video [myPosterFallback]="url">` : affiche d'un lecteur. `<video>` ne signale pas l'échec de
 *   son affiche : elle est donc d'abord chargée à part, et remplacée si ce chargement échoue
 *   (vidéo encore en traitement chez ImageKit, transformation refusée…).
 */
@Directive({
  selector: 'img[myPosterFallback], video[myPosterFallback]',
  host: { '(error)': 'onImageError()' },
})
export class PosterFallback {
  /** Pour `<video>` : l'affiche voulue. `null` ou absente : l'affiche de secours. */
  readonly myPosterFallback = input<string | null | undefined>();

  private readonly el = inject<ElementRef<HTMLImageElement | HTMLVideoElement>>(ElementRef).nativeElement;
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));

  constructor() {
    effect((onCleanup) => {
      // `tagName` plutôt que `instanceof HTMLVideoElement`, qui n'existe pas au rendu serveur.
      if (this.el.tagName !== 'VIDEO') {
        return;
      }
      const wanted = this.myPosterFallback() || VIDEO_POSTER_FALLBACK;
      this.el.setAttribute('poster', wanted);
      if (!this.browser || wanted === VIDEO_POSTER_FALLBACK) {
        return;
      }
      const probe = new Image();
      probe.onerror = () => this.el.setAttribute('poster', VIDEO_POSTER_FALLBACK);
      probe.src = wanted;
      onCleanup(() => (probe.onerror = null));
    });
  }

  protected onImageError(): void {
    // Une seule substitution : si l'affiche de secours échouait aussi, on n'insiste pas.
    if (this.el.tagName === 'IMG' && !this.el.getAttribute('src')?.endsWith(VIDEO_POSTER_FALLBACK)) {
      (this.el as HTMLImageElement).src = VIDEO_POSTER_FALLBACK;
    }
  }
}
