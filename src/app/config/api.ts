import { DOCUMENT, InjectionToken, inject } from '@angular/core';

/**
 * Origine à laquelle sont envoyés les appels `/api/...`.
 *
 * - Navigateur : l'origine du site. Le serveur Express (`src/server.ts`) relaie `/api` vers l'API
 *   Spring, et `ng serve` fait de même via `proxy.conf.json` : aucun CORS à gérer.
 * - Serveur (SSR) : l'API Spring directement (`API_URL`), voir `app.config.server.ts`.
 */
export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL', {
  providedIn: 'root',
  factory: () => inject(DOCUMENT).location?.origin ?? '',
});
