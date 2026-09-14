import { computed, Injectable, signal } from '@angular/core';
import { SiteContent } from '../models/content.model';
import { fr } from '../config/content/fr';

/** Locales disponibles. Ajouter une locale = ajouter un fichier dans `config/content/`. */
export type Locale = 'fr';

const CATALOG: Record<Locale, SiteContent> = { fr };

@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly language = signal<Locale>('fr');

  /** Contenu éditorial de la locale courante. */
  readonly content = computed(() => CATALOG[this.language()]);

  setLanguage(locale: Locale): void {
    this.language.set(locale);
  }
}
