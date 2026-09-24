import { Pipe, PipeTransform } from '@angular/core';
import { ImageFocus } from '../models/image.model';

/** Couleur des bandes ajoutées autour d'une photo affichée entière (`surface` du thème). */
const PAD_COLOR = 'F7F7F7';

/** Directives ImageKit ajoutées à la boîte `w-…,h-…` pour chaque cadrage. */
const FOCUS_TRANSFORMATIONS: Record<ImageFocus, string> = {
  auto: 'fo-auto',
  face: 'fo-face',
  center: 'fo-center',
  top: 'fo-top',
  bottom: 'fo-bottom',
  left: 'fo-left',
  right: 'fo-right',
  // Pas de recadrage : la photo entre en entier dans la boîte, complétée par des bandes.
  contain: `cm-pad_resize,bg-${PAD_COLOR}`,
};

/**
 * Applique une transformation ImageKit à une URL d'image : `photo | ik: 'w-400,h-500'`.
 * ImageKit redimensionne et convertit (WebP/AVIF) à la volée ; les autres URL sont laissées intactes.
 *
 * Le second argument, facultatif, est le cadrage choisi dans le back-office :
 * `photo | ik: 'w-400,h-500' : candidate.photoFocus`. La proportion reste celle du gabarit ; seul
 * change ce qui est conservé de la photo à l'intérieur.
 *
 * @see https://imagekit.io/docs/transformations
 */
@Pipe({ name: 'ik' })
export class ImageKitPipe implements PipeTransform {
  transform(
    url: string | null | undefined,
    transformation: string,
    focus?: ImageFocus | null,
  ): string | null {
    if (!url) {
      return null;
    }
    if (!url.includes('imagekit.io')) {
      return url;
    }
    const tr = focus ? `${transformation},${FOCUS_TRANSFORMATIONS[focus]}` : transformation;
    return `${url}${url.includes('?') ? '&' : '?'}tr=${tr}`;
  }
}
