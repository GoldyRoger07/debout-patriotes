import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Container } from '../../components/container/container';
import { PageHeader } from '../../components/page-header/page-header';
import { CandidateCard } from '../../components/candidate-card/candidate-card';
import { EmptyState } from '../../components/empty-state/empty-state';
import { LanguageService } from '../../services/language.service';
import { CandidatesApi } from '../../services/candidates-api.service';
import { DEFAULT_CARD_FORMATS } from '../../models/image.model';

@Component({
  selector: 'app-candidats',
  imports: [Container, PageHeader, CandidateCard, EmptyState],
  templateUrl: './candidats.html',
})
export default class Candidats {
  private readonly content = inject(LanguageService).content;

  protected readonly page = computed(() => this.content().candidates);
  private readonly candidatesApi = inject(CandidatesApi);
  /** `undefined` pendant le chargement. */
  protected readonly candidates = toSignal(this.candidatesApi.list());
  protected readonly cardFormats = toSignal(this.candidatesApi.cardFormats(), {
    initialValue: DEFAULT_CARD_FORMATS,
  });
}
