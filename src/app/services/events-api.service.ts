import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { API_BASE_URL } from '../config/api';
import { AgendaEvent } from '../models/event.model';

/** Lecture publique de l'agenda. */
@Injectable({ providedIn: 'root' })
export class EventsApi {
  private readonly http = inject(HttpClient);
  private readonly base = inject(API_BASE_URL);

  /** Événements publiés, du plus lointain au plus ancien. Liste vide si l'API est injoignable. */
  list(): Observable<AgendaEvent[]> {
    return this.http.get<AgendaEvent[]>(`${this.base}/api/events`).pipe(catchError(() => of([])));
  }
}
