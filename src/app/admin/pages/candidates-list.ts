import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminApi } from '../core/admin-api.service';
import { Feedback } from '../core/feedback.service';
import { AdminCandidate, CandidatePayload } from '../core/admin.model';
import { apiErrorMessage } from '../core/api-error';
import { ImageKitPipe } from '../../pipes/imagekit.pipe';

@Component({
  selector: 'admin-candidates-list',
  imports: [RouterLink, ImageKitPipe],
  templateUrl: './candidates-list.html',
})
export default class CandidatesList {
  private readonly api = inject(AdminApi);
  private readonly feedback = inject(Feedback);

  protected readonly candidates = signal<AdminCandidate[] | null>(null);
  protected readonly busy = signal(false);

  constructor() {
    this.api.candidates().subscribe({
      next: (list) => this.candidates.set(list),
      error: (err) => {
        this.candidates.set([]);
        this.feedback.error(apiErrorMessage(err));
      },
    });
  }

  /** Déplace un candidat d'un cran : l'ordre est celui du site (accueil et page « Nos candidats »). */
  protected move(index: number, direction: -1 | 1): void {
    const list = [...(this.candidates() ?? [])];
    const target = index + direction;
    if (target < 0 || target >= list.length) {
      return;
    }
    [list[index], list[target]] = [list[target], list[index]];
    this.candidates.set(list);
    this.busy.set(true);
    this.api.reorderCandidates(list.map((c) => c.id)).subscribe({
      next: (saved) => {
        this.candidates.set(saved);
        this.busy.set(false);
      },
      error: (err) => {
        this.busy.set(false);
        this.feedback.error(apiErrorMessage(err, "Le nouvel ordre n'a pas pu être enregistré."));
      },
    });
  }

  protected togglePublished(candidate: AdminCandidate): void {
    const { id, displayOrder, updatedAt, ...rest } = candidate;
    const payload: CandidatePayload = { ...rest, published: !candidate.published };
    this.busy.set(true);
    this.api.saveCandidate(id, payload).subscribe({
      next: (saved) => {
        this.candidates.update((list) => list?.map((c) => (c.id === saved.id ? saved : c)) ?? null);
        this.busy.set(false);
        this.feedback.success(
          saved.published ? `${saved.name} est en ligne.` : `${saved.name} est masqué du site.`,
        );
      },
      error: (err) => {
        this.busy.set(false);
        this.feedback.error(apiErrorMessage(err));
      },
    });
  }

  protected async remove(candidate: AdminCandidate): Promise<void> {
    const confirmed = await this.feedback.confirm({
      title: `Supprimer ${candidate.name} ?`,
      message:
        'La fiche et sa photo seront définitivement supprimées. Pour la retirer temporairement du site, masquez-la plutôt.',
      confirmLabel: 'Supprimer',
      danger: true,
    });
    if (!confirmed) {
      return;
    }
    this.api.deleteCandidate(candidate.id).subscribe({
      next: () => {
        this.candidates.update((list) => list?.filter((c) => c.id !== candidate.id) ?? null);
        this.feedback.success('Candidat supprimé.');
      },
      error: (err) => this.feedback.error(apiErrorMessage(err)),
    });
  }
}
