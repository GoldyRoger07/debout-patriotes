import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, of, shareReplay } from 'rxjs';
import { API_BASE_URL } from '../config/api';
import { Category, Page, Post, PostSummary, emptyPage } from '../models/blog.model';

/** Lecture publique du blog depuis l'API : seuls les articles publiés sont exposés. */
@Injectable({ providedIn: 'root' })
export class BlogApi {
  private readonly http = inject(HttpClient);
  private readonly base = inject(API_BASE_URL);
  private last?: { slug: string; request: Observable<Post | null> };

  /** Articles publiés, du plus récent au plus ancien. Page vide si l'API est injoignable. */
  list(options: { category?: string | null; page?: number; size?: number } = {}): Observable<Page<PostSummary>> {
    let params = new HttpParams().set('page', options.page ?? 0).set('size', options.size ?? 9);
    if (options.category) {
      params = params.set('category', options.category);
    }
    return this.http
      .get<Page<PostSummary>>(`${this.base}/api/posts`, { params })
      .pipe(catchError(() => of(emptyPage<PostSummary>())));
  }

  categories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.base}/api/categories`).pipe(catchError(() => of([])));
  }

  /** Article complet, `null` s'il est introuvable. Partagé entre les résolveurs d'une navigation. */
  bySlug(slug: string): Observable<Post | null> {
    if (this.last?.slug !== slug) {
      const request = this.http
        .get<Post>(`${this.base}/api/posts/${encodeURIComponent(slug)}`)
        .pipe(
          catchError(() => of(null)),
          shareReplay(1),
        );
      this.last = { slug, request };
    }
    return this.last.request;
  }
}
