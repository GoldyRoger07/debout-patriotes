import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../config/api';
import { Category, Page, Post, PostStatus, PostSummary } from '../../models/blog.model';
import { CardFormats } from '../../models/image.model';
import {
  AdminCandidate,
  CandidatePayload,
  CategoryPayload,
  Dashboard,
  GalleryImage,
  ImageFolder,
  ImageQuery,
  PostPayload,
  UploadedImage,
} from './admin.model';

/** Images chargées par page de médiathèque. */
export const GALLERY_PAGE_SIZE = 24;

/**
 * Appels authentifiés du back-office. Fourni par les routes `/admin`, dont le `HttpClient`
 * porte l'intercepteur d'authentification.
 */
@Injectable()
export class AdminApi {
  private readonly http = inject(HttpClient);
  private readonly base = `${inject(API_BASE_URL)}/api`;

  dashboard(): Observable<Dashboard> {
    return this.http.get<Dashboard>(`${this.base}/admin/dashboard`);
  }

  // --- Articles --------------------------------------------------------------

  posts(filter: {
    status?: PostStatus | null;
    q?: string;
    page?: number;
    size?: number;
  }): Observable<Page<PostSummary>> {
    let params = new HttpParams().set('page', filter.page ?? 0).set('size', filter.size ?? 20);
    if (filter.status) {
      params = params.set('status', filter.status);
    }
    if (filter.q) {
      params = params.set('q', filter.q);
    }
    return this.http.get<Page<PostSummary>>(`${this.base}/admin/posts`, { params });
  }

  post(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.base}/admin/posts/${id}`);
  }

  savePost(id: number | null, payload: PostPayload): Observable<Post> {
    return id === null
      ? this.http.post<Post>(`${this.base}/admin/posts`, payload)
      : this.http.put<Post>(`${this.base}/admin/posts/${id}`, payload);
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/admin/posts/${id}`);
  }

  // --- Rubriques -------------------------------------------------------------

  categories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.base}/admin/categories`);
  }

  saveCategory(id: number | null, payload: CategoryPayload): Observable<Category> {
    return id === null
      ? this.http.post<Category>(`${this.base}/admin/categories`, payload)
      : this.http.put<Category>(`${this.base}/admin/categories/${id}`, payload);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/admin/categories/${id}`);
  }

  // --- Candidats -------------------------------------------------------------

  candidates(): Observable<AdminCandidate[]> {
    return this.http.get<AdminCandidate[]>(`${this.base}/admin/candidates`);
  }

  candidate(id: number): Observable<AdminCandidate> {
    return this.http.get<AdminCandidate>(`${this.base}/admin/candidates/${id}`);
  }

  saveCandidate(id: number | null, payload: CandidatePayload): Observable<AdminCandidate> {
    return id === null
      ? this.http.post<AdminCandidate>(`${this.base}/admin/candidates`, payload)
      : this.http.put<AdminCandidate>(`${this.base}/admin/candidates/${id}`, payload);
  }

  deleteCandidate(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/admin/candidates/${id}`);
  }

  reorderCandidates(ids: number[]): Observable<AdminCandidate[]> {
    return this.http.put<AdminCandidate[]>(`${this.base}/admin/candidates/order`, { ids });
  }

  /** Proportion des photos des cartes, par emplacement du site. */
  cardFormats(): Observable<CardFormats> {
    return this.http.get<CardFormats>(`${this.base}/admin/candidates/card-formats`);
  }

  saveCardFormats(formats: CardFormats): Observable<CardFormats> {
    return this.http.put<CardFormats>(`${this.base}/admin/candidates/card-formats`, formats);
  }

  // --- Images (ImageKit) -----------------------------------------------------

  /** Images déjà en ligne dans un dossier, pour en réutiliser une. */
  images(query: ImageQuery): Observable<GalleryImage[]> {
    const params = new HttpParams()
      .set('folder', query.folder)
      .set('skip', query.skip ?? 0)
      .set('limit', query.limit ?? GALLERY_PAGE_SIZE)
      .set('q', query.q ?? '');
    return this.http.get<GalleryImage[]>(`${this.base}/admin/images`, { params });
  }

  uploadImage(file: File, folder: ImageFolder): Observable<UploadedImage> {
    const body = new FormData();
    body.append('file', file);
    return this.http.post<UploadedImage>(`${this.base}/admin/images`, body, { params: { folder } });
  }

  deleteImage(fileId: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/admin/images/${encodeURIComponent(fileId)}`);
  }

  // --- Compte ----------------------------------------------------------------

  changePassword(currentPassword: string, newPassword: string): Observable<void> {
    return this.http.put<void>(`${this.base}/auth/password`, { currentPassword, newPassword });
  }
}
