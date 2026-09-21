import { Pipe, PipeTransform } from '@angular/core';

/**
 * Applique une transformation ImageKit à une URL d'image : `photo | ik: 'w-400,h-500'`.
 * ImageKit redimensionne et convertit (WebP/AVIF) à la volée ; les autres URL sont laissées intactes.
 *
 * @see https://imagekit.io/docs/transformations
 */
@Pipe({ name: 'ik' })
export class ImageKitPipe implements PipeTransform {
  transform(url: string | null | undefined, transformation: string): string | null {
    if (!url) {
      return null;
    }
    if (!url.includes('imagekit.io')) {
      return url;
    }
    return `${url}${url.includes('?') ? '&' : '?'}tr=${transformation}`;
  }
}
