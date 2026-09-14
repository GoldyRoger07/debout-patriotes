import { Component, computed, inject, signal } from '@angular/core';
import { Container } from '../../components/container/container';
import { PageHeader } from '../../components/page-header/page-header';
import { EmptyState } from '../../components/empty-state/empty-state';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-actualites',
  imports: [Container, PageHeader, EmptyState],
  templateUrl: './actualites.html',
})
export default class Actualites {
  private readonly content = inject(LanguageService).content;

  protected readonly page = computed(() => this.content().news);
  protected readonly activeCategory = signal('Tout');

  protected readonly visibleItems = computed(() => {
    const category = this.activeCategory();
    const items = this.page().items;
    return category === 'Tout' ? items : items.filter((item) => item.category === category);
  });

  protected select(category: string): void {
    this.activeCategory.set(category);
  }
}
