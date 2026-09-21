import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { Container } from '../../components/container/container';
import { SectionTitle } from '../../components/section-title/section-title';
import { CandidateCard } from '../../components/candidate-card/candidate-card';
import { CtaSection } from '../../components/cta-section/cta-section';
import { EmptyState } from '../../components/empty-state/empty-state';
import { LanguageService } from '../../services/language.service';
import { CandidatesApi } from '../../services/candidates-api.service';
import { Candidate } from '../../models/content.model';
import { ImageKitPipe } from '../../pipes/imagekit.pipe';

/** Fiche détaillée d'un candidat : `/candidats/:slug`. Données chargées par le résolveur de la route. */
@Component({
  selector: 'app-candidat',
  imports: [Container, SectionTitle, CandidateCard, CtaSection, EmptyState, RouterLink, ImageKitPipe],
  templateUrl: './candidat.html',
})
export default class Candidat {
  private readonly content = inject(LanguageService).content;

  /** Suit les données résolues : la page se met à jour en passant d'un candidat à l'autre. */
  protected readonly candidate = toSignal(
    inject(ActivatedRoute).data.pipe(map((data) => data['candidate'] as Candidate | null)),
  );
  private readonly all = toSignal(inject(CandidatesApi).list(), { initialValue: [] });

  protected readonly labels = computed(() => this.content().candidates.profile);
  protected readonly others = computed(() =>
    this.all()
      .filter((c) => c.slug !== this.candidate()?.slug)
      .slice(0, 4),
  );
}
