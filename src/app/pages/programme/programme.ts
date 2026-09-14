import { Component, computed, inject } from '@angular/core';
import { Container } from '../../components/container/container';
import { PageHeader } from '../../components/page-header/page-header';
import { SectionTitle } from '../../components/section-title/section-title';
import { FeatureGrid } from '../../components/feature-grid/feature-grid';
import { CtaSection } from '../../components/cta-section/cta-section';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-programme',
  imports: [Container, PageHeader, SectionTitle, FeatureGrid, CtaSection],
  templateUrl: './programme.html',
})
export default class Programme {
  private readonly content = inject(LanguageService).content;

  protected readonly page = computed(() => this.content().program);
}
