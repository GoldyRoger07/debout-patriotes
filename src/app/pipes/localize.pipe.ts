import { Pipe, PipeTransform, inject } from '@angular/core';
import { LanguageService } from '../services/language.service';

/**
 * Adapte un lien interne à la langue affichée : `'/vision' | localize` donne `/en/vision` sur le
 * site anglais. Le contenu éditorial ne contient donc que les adresses du site français.
 */
@Pipe({ name: 'localize', pure: false })
export class LocalizePipe implements PipeTransform {
  private readonly language = inject(LanguageService);

  transform(url: string): string;
  transform(url: string | undefined): string | undefined;
  transform(url: string | undefined): string | undefined {
    return url === undefined ? undefined : this.language.localize(url);
  }
}
