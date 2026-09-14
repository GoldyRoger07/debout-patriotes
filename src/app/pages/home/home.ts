import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Container } from '../../components/container/container';
import { SectionTitle } from '../../components/section-title/section-title';
import { CtaSection } from '../../components/cta-section/cta-section';
import { EmptyState } from '../../components/empty-state/empty-state';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-home',
  imports: [Container, SectionTitle, CtaSection, EmptyState, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export default class Home {
  private readonly content = inject(LanguageService).content;

  protected readonly page = computed(() => this.content().home);
  /** Les quatre piliers sont définis une seule fois, sur la page Vision. */
  protected readonly pillars = computed(() => this.content().vision.pillars);
  protected readonly news = computed(() => this.content().news);
}
