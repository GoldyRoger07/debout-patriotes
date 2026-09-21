import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { Container } from '../../components/container/container';
import { SectionTitle } from '../../components/section-title/section-title';
import { CtaSection } from '../../components/cta-section/cta-section';
import { CandidateCard } from '../../components/candidate-card/candidate-card';
import { PostCard } from '../../components/post-card/post-card';
import { EmptyState } from '../../components/empty-state/empty-state';
import { LanguageService } from '../../services/language.service';
import { CandidatesApi } from '../../services/candidates-api.service';
import { BlogApi } from '../../services/blog-api.service';

@Component({
  selector: 'app-home',
  imports: [Container, SectionTitle, CtaSection, EmptyState, CandidateCard, PostCard, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export default class Home {
  private readonly content = inject(LanguageService).content;

  protected readonly page = computed(() => this.content().home);
  /** Les quatre piliers sont définis une seule fois, sur la page Vision. */
  protected readonly pillars = computed(() => this.content().vision.pillars);
  protected readonly candidates = toSignal(inject(CandidatesApi).list(), { initialValue: [] });
  protected readonly news = computed(() => this.content().news);
  protected readonly latestPosts = toSignal(
    inject(BlogApi)
      .list({ size: 3 })
      .pipe(map((page) => page.items)),
  );
}
