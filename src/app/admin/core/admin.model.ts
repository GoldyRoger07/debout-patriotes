import { Candidate } from '../../models/content.model';
import { PostStatus } from '../../models/blog.model';
import { ImageFocus } from '../../models/image.model';

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
export type ImageFolder = 'blog' | 'candidats' | 'divers';

export interface AdminCandidate extends Candidate {
  id: number;
  photoFileId?: string | null;
  coverFileId?: string | null;
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
  categoryId: number | null;
  status: PostStatus;
  publishedAt: string | null;
}

export interface CategoryPayload {
  name: string;
  slug?: string | null;
  displayOrder?: number | null;
}
