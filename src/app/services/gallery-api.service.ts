import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, of, shareReplay } from 'rxjs';
import { API_BASE_URL } from '../config/api';
import { Album, AlbumSummary } from '../models/gallery.model';

/** Lecture publique de la galerie : seuls les albums publiés sont exposés. */
@Injectable({ providedIn: 'root' })
export class GalleryApi {
  private readonly http = inject(HttpClient);
  private readonly base = inject(API_BASE_URL);
  private last?: { slug: string; request: Observable<Album | null> };

  /** Albums publiés, du plus récent au plus ancien. Liste vide si l'API est injoignable. */
  list(): Observable<AlbumSummary[]> {
    return this.http.get<AlbumSummary[]>(`${this.base}/api/albums`).pipe(catchError(() => of([])));
  }

  /** Album complet, `null` s'il est introuvable. Partagé entre les résolveurs d'une navigation. */
  bySlug(slug: string): Observable<Album | null> {
    if (this.last?.slug !== slug) {
      const request = this.http
        .get<Album>(`${this.base}/api/albums/${encodeURIComponent(slug)}`)
        .pipe(
          catchError(() => of(null)),
          shareReplay(1),
        );
      this.last = { slug, request };
    }
    return this.last.request;
  }
}
