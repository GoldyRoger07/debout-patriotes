import { Component, computed, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { Container } from '../../components/container/container';
import { SectionTitle } from '../../components/section-title/section-title';
import { CtaSection } from '../../components/cta-section/cta-section';
import { EmptyState } from '../../components/empty-state/empty-state';
import { PostCard } from '../../components/post-card/post-card';
import { LanguageService } from '../../services/language.service';
import { BlogApi } from '../../services/blog-api.service';
import { Post } from '../../models/blog.model';
import { ImageKitPipe } from '../../pipes/imagekit.pipe';
import { MarkdownPipe } from '../../pipes/markdown.pipe';

/** Article du blog : `/actualites/:slug`. Données chargées par le résolveur de la route. */
@Component({
  selector: 'app-article',
  imports: [Container, SectionTitle, CtaSection, EmptyState, PostCard, RouterLink, DatePipe, ImageKitPipe, MarkdownPipe],
  templateUrl: './article.html',
})
export default class Article {
  private readonly content = inject(LanguageService).content;

  protected readonly post = toSignal(inject(ActivatedRoute).data.pipe(map((data) => data['post'] as Post | null)));
  private readonly latest = toSignal(
    inject(BlogApi)
      .list({ size: 4 })
      .pipe(map((page) => page.items)),
    { initialValue: [] },
  );

  protected readonly labels = computed(() => this.content().news);
  protected readonly related = computed(() =>
    this.latest()
      .filter((item) => item.slug !== this.post()?.slug)
      .slice(0, 3),
  );
}
