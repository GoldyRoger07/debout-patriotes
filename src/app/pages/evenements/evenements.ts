import { Component, computed, inject } from '@angular/core';
import { Container } from '../../components/container/container';
import { PageHeader } from '../../components/page-header/page-header';
import { EmptyState } from '../../components/empty-state/empty-state';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-evenements',
  imports: [Container, PageHeader, EmptyState],
  templateUrl: './evenements.html',
})
export default class Evenements {
  private readonly content = inject(LanguageService).content;

  protected readonly page = computed(() => this.content().events);
}
