/** Formes JSON renvoyées par l'API pour la galerie (voir `GalleryDtos` côté Spring). */

export type MediaType = 'image' | 'video';

/** Une photo ou une vidéo hébergée sur ImageKit. */
export interface AlbumItem {
  type: MediaType;
  url: string;
  fileId?: string | null;
  caption?: string | null;
}

/** Album sans ses éléments : grille de `/galerie`. */
export interface AlbumSummary {
  id: number;
  slug: string;
  title: string;
  /** Date des prises de vue, ISO `AAAA-MM-JJ`. */
  takenOn?: string | null;
  /** Premier élément de l'album, qui lui sert de couverture. */
  cover?: AlbumItem | null;
  photoCount: number;
  videoCount: number;
  published: boolean;
  updatedAt: string;
}

export interface Album {
  id: number;
  slug: string;
  title: string;
  description?: string | null;
  takenOn?: string | null;
  items: AlbumItem[];
  published: boolean;
  updatedAt: string;
}

/** Vignette d'un élément : l'image elle-même, ou l'image extraite de la vidéo par ImageKit. */
export function thumbnailOf(item: AlbumItem): string {
  return item.type === 'video' ? (videoThumbnail(item.url) ?? item.url) : item.url;
}

/**
 * Image extraite d'une vidéo ImageKit, ou `null` hors ImageKit. Le suffixe `/ik-thumbnail.jpg`
 * se place dans le chemin, avant une éventuelle query (`?updatedAt=…`) : collé après, ImageKit
 * l'ignorerait et renverrait la vidéo elle-même.
 *
 * @see https://imagekit.io/docs/create-video-thumbnails
 */
export function videoThumbnail(url: string): string | null {
  if (!url.includes('imagekit.io')) {
    return null;
  }
  const query = url.indexOf('?');
  return query < 0 ? `${url}/ik-thumbnail.jpg` : `${url.slice(0, query)}/ik-thumbnail.jpg${url.slice(query)}`;
}
