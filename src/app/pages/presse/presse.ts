import { Component, computed, inject } from '@angular/core';
import { Container } from '../../components/container/container';
import { PageHeader } from '../../components/page-header/page-header';
import { EmptyState } from '../../components/empty-state/empty-state';
import { SectionTitle } from '../../components/section-title/section-title';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-presse',
  imports: [Container, PageHeader, EmptyState, SectionTitle],
  templateUrl: './presse.html',
})
export default class Presse {
  private readonly content = inject(LanguageService).content;

  protected readonly page = computed(() => this.content().press);

  /** Libellé lisible pour chaque type de document. */
  protected readonly kindLabels: Record<string, string> = {
    communique: 'Communiqué',
    note: 'Note',
    declaration: 'Déclaration',
    dossier: 'Dossier',
  };
}
