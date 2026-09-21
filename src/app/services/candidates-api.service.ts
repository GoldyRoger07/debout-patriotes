import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, of, shareReplay } from 'rxjs';
import { API_BASE_URL } from '../config/api';
import { Candidate } from '../models/content.model';

/** Lecture publique des candidats publiés depuis l'API. */
@Injectable({ providedIn: 'root' })
export class CandidatesApi {
  private readonly http = inject(HttpClient);
  private readonly base = inject(API_BASE_URL);
  private last?: { slug: string; request: Observable<Candidate | null> };

  /** Candidats publiés, dans l'ordre choisi dans le back-office. Liste vide si l'API est injoignable. */
  list(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(`${this.base}/api/candidates`).pipe(catchError(() => of([])));
  }

  /**
   * Fiche d'un candidat, `null` s'il est introuvable. La requête est partagée entre les résolveurs
   * d'une même navigation (titre, SEO, données) : un seul appel à l'API.
   */
  bySlug(slug: string): Observable<Candidate | null> {
    if (this.last?.slug !== slug) {
      const request = this.http
        .get<Candidate>(`${this.base}/api/candidates/${encodeURIComponent(slug)}`)
        .pipe(
          catchError(() => of(null)),
          shareReplay(1),
        );
      this.last = { slug, request };
    }
    return this.last.request;
  }
}
