import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, map, tap } from 'rxjs';
import { API_BASE_URL } from '../../config/api';
import { Session } from './admin.model';

const STORAGE_KEY = 'dp.admin.session';

/** Session du back-office : jeton JWT conservé dans le navigateur jusqu'à son expiration. */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly base = inject(API_BASE_URL);
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly session = signal<Session | null>(this.restore());

  readonly user = computed(() => this.session()?.user ?? null);
  readonly token = computed(() => this.session()?.token ?? null);

  isAuthenticated(): boolean {
    const session = this.session();
    if (session && new Date(session.expiresAt).getTime() <= Date.now()) {
      this.save(null);
      return false;
    }
    return session !== null;
  }

  login(email: string, password: string): Observable<void> {
    return this.http.post<Session>(`${this.base}/api/auth/login`, { email, password }).pipe(
      tap((session) => this.save(session)),
      map(() => undefined),
    );
  }

  logout(): void {
    this.save(null);
  }

  private save(session: Session | null): void {
    this.session.set(session);
    if (!this.browser) {
      return;
    }
    try {
      if (session) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // Stockage indisponible (navigation privée stricte) : la session vit le temps de l'onglet.
    }
  }

  private restore(): Session | null {
    if (!this.browser) {
      return null;
    }
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Session) : null;
    } catch {
      return null;
    }
  }
}
