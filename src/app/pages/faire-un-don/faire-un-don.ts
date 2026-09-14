import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Container } from '../../components/container/container';
import { PageHeader } from '../../components/page-header/page-header';
import { SectionTitle } from '../../components/section-title/section-title';
import { FeatureGrid } from '../../components/feature-grid/feature-grid';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-faire-un-don',
  imports: [Container, PageHeader, SectionTitle, FeatureGrid, RouterLink],
  templateUrl: './faire-un-don.html',
})
export default class FaireUnDon {
  private readonly content = inject(LanguageService).content;

  protected readonly page = computed(() => this.content().donate);
}
