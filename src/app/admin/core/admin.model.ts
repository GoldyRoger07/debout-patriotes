import { Candidate } from '../../models/content.model';
import { PostStatus } from '../../models/blog.model';
import { ImageFocus } from '../../models/image.model';
import { AlbumItem } from '../../models/gallery.model';

export interface AdminUser {
  id: number;
  email: string;
  displayName: string;
}

export interface Session {
  token: string;
  /** Date ISO d'expiration du jeton. */
  expiresAt: string;
  user: AdminUser;
}

export interface Dashboard {
  publishedPosts: number;
  draftPosts: number;
  publishedCandidates: number;
  totalCandidates: number;
  imageKitConfigured: boolean;
}

/**
 * Image hébergée sur ImageKit, telle que la manipule un formulaire : l'URL affichée, l'identifiant
 * qui permet de la supprimer, et le cadrage retenu pour son emplacement sur le site.
 */
export interface ImageRef {
  url: string;
  fileId: string | null;
  focus: ImageFocus;
}

/** Vidéo hébergée sur ImageKit, telle que la manipule un formulaire. */
export interface VideoRef {
  url: string;
  fileId: string | null;
}

export interface UploadedVideo {
  fileId: string;
  url: string;
  thumbnailUrl?: string;
  name: string;
  width?: number;
  height?: number;
  size?: number;
}

export interface UploadedImage {
  fileId: string;
  url: string;
  thumbnailUrl?: string;
  name: string;
  width?: number;
  height?: number;
}

/** Une image de la médiathèque ImageKit, telle que listée par `GET /api/admin/images`. */
export interface GalleryImage extends UploadedImage {
  /** Taille du fichier en octets. */
  size?: number;
  /** Date ISO de mise en ligne. */
  createdAt?: string;
  folder: ImageFolder;
  /** Déjà utilisée par un article ou une fiche candidat : elle ne peut pas être supprimée. */
  inUse: boolean;
}

/** Filtre d'un inventaire de la médiathèque. */
export interface ImageQuery {
  folder: ImageFolder;
  q?: string;
  skip?: number;
  limit?: number;
}

/** Dossier de la médiathèque ImageKit (voir `ImageKitService.ALLOWED_FOLDERS` côté API). */
export type ImageFolder = 'blog' | 'candidats' | 'galerie' | 'evenements' | 'divers';

export interface AdminCandidate extends Candidate {
  id: number;
  photoFileId?: string | null;
  coverFileId?: string | null;
  videoFileId?: string | null;
  displayOrder: number;
  published: boolean;
  updatedAt: string;
}

export type CandidatePayload = Omit<AdminCandidate, 'id' | 'displayOrder' | 'updatedAt'>;

export interface PostPayload {
  slug: string | null;
  title: string;
  excerpt: string;
  content: string;
  cover: string | null;
  coverFileId: string | null;
  coverFocus: ImageFocus | null;
  video: string | null;
  videoFileId: string | null;
  categoryId: number | null;
  status: PostStatus;
  publishedAt: string | null;
}

export interface AlbumPayload {
  slug: string | null;
  title: string;
  description: string | null;
  /** Date ISO `AAAA-MM-JJ`. */
  takenOn: string | null;
  items: AlbumItem[];
  published: boolean;
}

export interface EventPayload {
  slug: string | null;
  title: string;
  kind: string | null;
  description: string | null;
  startsAt: string;
  place: string | null;
  city: string | null;
  cover: string | null;
  coverFileId: string | null;
  coverFocus: ImageFocus | null;
  video: string | null;
  videoFileId: string | null;
  published: boolean;
}

export interface CategoryPayload {
  name: string;
  slug?: string | null;
  displayOrder?: number | null;
}
