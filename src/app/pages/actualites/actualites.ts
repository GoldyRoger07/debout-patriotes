import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Subscription } from 'rxjs';
import { Container } from '../../components/container/container';
import { PageHeader } from '../../components/page-header/page-header';
import { EmptyState } from '../../components/empty-state/empty-state';
import { PostCard } from '../../components/post-card/post-card';
import { LanguageService } from '../../services/language.service';
import { BlogApi } from '../../services/blog-api.service';
import { PostSummary } from '../../models/blog.model';

const PAGE_SIZE = 9;

@Component({
  selector: 'app-actualites',
  imports: [Container, PageHeader, EmptyState, PostCard],
  templateUrl: './actualites.html',
})
export default class Actualites {
  private readonly content = inject(LanguageService).content;
  private readonly api = inject(BlogApi);
  private request?: Subscription;

  protected readonly page = computed(() => this.content().news);
  private readonly categories = toSignal(this.api.categories(), { initialValue: [] });
  /** « Tout » suivi des rubriques gérées dans le back-office. */
  protected readonly filters = computed(() => [
    { slug: null as string | null, name: this.page().all },
    ...this.categories().map(({ slug, name }) => ({ slug, name })),
  ]);

  /** Slug de la rubrique filtrée, `null` pour toutes. */
  protected readonly activeCategory = signal<string | null>(null);
  protected readonly items = signal<PostSummary[]>([]);
  protected readonly hasMore = signal(false);
  protected readonly loading = signal(true);
  private pageIndex = 0;

  constructor() {
    inject(DestroyRef).onDestroy(() => this.request?.unsubscribe());
    this.load(0);
  }

  protected select(category: string | null): void {
    this.activeCategory.set(category);
    this.load(0);
  }

  protected more(): void {
    this.load(this.pageIndex + 1);
  }

  private load(pageIndex: number): void {
    this.request?.unsubscribe();
    this.loading.set(true);
    this.request = this.api
      .list({ category: this.activeCategory(), page: pageIndex, size: PAGE_SIZE })
      .subscribe((result) => {
        this.pageIndex = pageIndex;
        this.items.update((previous) => (pageIndex === 0 ? result.items : [...previous, ...result.items]));
        this.hasMore.set(result.page + 1 < result.totalPages);
        this.loading.set(false);
      });
  }
}
