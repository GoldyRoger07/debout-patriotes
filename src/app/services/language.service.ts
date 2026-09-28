import { DOCUMENT, computed, inject, Injectable, signal } from '@angular/core';
import { SiteContent } from '../models/content.model';
import { fr } from '../config/content/fr';
import { en } from '../config/content/en';

/** Locales disponibles. Ajouter une locale = ajouter un fichier dans `config/content/`. */
export type Locale = 'fr' | 'en';

export const CATALOG: Record<Locale, SiteContent> = { fr, en };

/** Préfixe d'URL de chaque locale : le français, langue principale, est servi à la racine. */
export const LOCALE_PREFIX: Record<Locale, string> = { fr: '', en: 'en' };

/** Valeur de `og:locale` pour chaque locale. */
const OG_LOCALE: Record<Locale, string> = { fr: 'fr_HT', en: 'en_US' };

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly document = inject(DOCUMENT);

  readonly language = signal<Locale>('fr');

  /** Contenu éditorial de la locale courante. */
  readonly content = computed(() => CATALOG[this.language()]);

  readonly ogLocale = computed(() => OG_LOCALE[this.language()]);

  /** La locale vers laquelle bascule le sélecteur de langue. */
  readonly otherLanguage = computed<Locale>(() => (this.language() === 'fr' ? 'en' : 'fr'));

  setLanguage(locale: Locale): void {
    this.language.set(locale);
    // Rendu serveur compris : le HTML envoyé porte la bonne langue.
    this.document.documentElement.lang = locale;
  }

  /** Adresse d'une page du site dans une locale (courante par défaut) : `/vision` → `/en/vision`. */
  localize(url: string, locale: Locale = this.language()): string {
    const prefix = LOCALE_PREFIX[locale];
    if (!prefix || !url.startsWith('/')) {
      return url;
    }
    return url === '/' ? `/${prefix}` : `/${prefix}${url}`;
  }

  /** Même page, dans une autre locale : `/en/vision?x=1` → `/vision?x=1`. */
  translateUrl(url: string, locale: Locale): string {
    return this.localize(stripLocale(url), locale);
  }
}

/** Retire le préfixe de locale d'une adresse : `/en/vision` → `/vision`, `/en` → `/`. */
function stripLocale(url: string): string {
  for (const prefix of Object.values(LOCALE_PREFIX)) {
    if (!prefix) {
      continue;
    }
    const match = new RegExp(`^/${prefix}(?=$|[/?#])`).exec(url);
    if (match) {
      const rest = url.slice(match[0].length);
      return rest.startsWith('/') ? rest : `/${rest}`;
    }
  }
  return url;
}
