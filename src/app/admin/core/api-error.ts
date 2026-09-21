import { HttpErrorResponse } from '@angular/common/http';

/** Message lisible à partir d'une erreur de l'API (réponses `application/problem+json`). */
export function apiErrorMessage(
  error: unknown,
  fallback = 'Une erreur est survenue. Réessayez.',
): string {
  if (error instanceof HttpErrorResponse) {
    if (error.status === 0 || error.status === 502) {
      return "Impossible de joindre l'API. Vérifiez qu'elle est démarrée.";
    }
    const detail = error.error?.detail;
    if (typeof detail === 'string' && detail) {
      return detail;
    }
  }
  return fallback;
}

/** Erreurs de validation par champ renvoyées par l'API (`errors` : champ → message). */
export function apiFieldErrors(error: unknown): Record<string, string> {
  if (
    error instanceof HttpErrorResponse &&
    error.error?.errors &&
    typeof error.error.errors === 'object'
  ) {
    return error.error.errors as Record<string, string>;
  }
  return {};
}
