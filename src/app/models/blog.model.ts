/** Formes JSON renvoyées par l'API pour le blog (voir `BlogDtos` côté Spring). */

import { ImageFocus } from './image.model';

export interface Category {
  id: number;
  name: string;
  slug: string;
  displayOrder: number;
  /** Renseigné uniquement dans le back-office. */
  postCount?: number | null;
}

export type PostStatus = 'DRAFT' | 'PUBLISHED';

export interface PostSummary {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  cover?: string | null;
  /** Cadrage de la couverture choisi dans le back-office. */
  coverFocus?: ImageFocus | null;
  category?: Category | null;
  status: PostStatus;
  /** Date ISO 8601. */
  publishedAt?: string | null;
  updatedAt: string;
}

export interface Post extends PostSummary {
  /** Corps de l'article, en Markdown. */
  content: string;
  coverFileId?: string | null;
  createdAt: string;
}

export interface Page<T> {
  items: T[];
  page: number;
  size: number;
  totalItems: number;
  totalPages: number;
}

export const emptyPage = <T>(): Page<T> => ({ items: [], page: 0, size: 0, totalItems: 0, totalPages: 0 });
