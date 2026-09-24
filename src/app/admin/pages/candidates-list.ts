import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminApi } from '../core/admin-api.service';
import { Feedback } from '../core/feedback.service';
import { AdminCandidate, CandidatePayload } from '../core/admin.model';
import { apiErrorMessage } from '../core/api-error';
import { ImageKitPipe } from '../../pipes/imagekit.pipe';
import {
  CARD_RATIO_OPTIONS,
  CardFormats,
  ImageFocus,
  ImageRatio,
  PORTRAIT_FOCUS,
} from '../../models/image.model';

/** Emplacements des cartes sur le site, réglés séparément. */
const PLACEMENTS: ReadonlyArray<{ key: keyof CardFormats; label: string; hint: string }> = [
  { key: 'home', label: 'Accueil', hint: 'Défilement des candidats sur la page d’accueil.' },
  { key: 'list', label: 'Page « Nos candidats »', hint: 'Grille de la liste complète.' },
];

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

  protected readonly placements = PLACEMENTS;
  protected readonly ratioOptions = CARD_RATIO_OPTIONS;
  /** Format des cartes tel qu'enregistré, et tel que modifié dans le panneau. */
  private readonly savedFormats = signal<CardFormats | null>(null);
  protected readonly formats = signal<CardFormats | null>(null);
  protected readonly savingFormats = signal(false);
  protected readonly formatsChanged = computed(
    () => JSON.stringify(this.formats()) !== JSON.stringify(this.savedFormats()),
  );

  constructor() {
    this.api.cardFormats().subscribe({
      next: (formats) => {
        this.savedFormats.set(formats);
        this.formats.set(formats);
      },
      error: (err) => this.feedback.error(apiErrorMessage(err)),
    });

    this.api.candidates().subscribe({
      next: (list) => this.candidates.set(list),
      error: (err) => {
        this.candidates.set([]);
        this.feedback.error(apiErrorMessage(err));
      },
    });
  }

  protected isRatio(a: ImageRatio, b: ImageRatio): boolean {
    return a.width === b.width && a.height === b.height;
  }

  protected setRatio(key: keyof CardFormats, ratio: ImageRatio): void {
    this.formats.update((formats) => (formats ? { ...formats, [key]: ratio } : formats));
  }

  protected saveFormats(): void {
    const formats = this.formats();
    if (!formats) {
      return;
    }
    this.savingFormats.set(true);
    this.api.saveCardFormats(formats).subscribe({
      next: (saved) => {
        this.savedFormats.set(saved);
        this.formats.set(saved);
        this.savingFormats.set(false);
        this.feedback.success('Format des cartes enregistré.');
      },
      error: (err) => {
        this.savingFormats.set(false);
        this.feedback.error(apiErrorMessage(err, "Le format des cartes n'a pas pu être enregistré."));
      },
    });
  }

  /** Vignette de la liste : le portrait de la fiche, à défaut la couverture, avec son cadrage. */
  protected thumbnail(candidate: AdminCandidate): { url: string; focus: ImageFocus } | null {
    if (candidate.photo) {
      return { url: candidate.photo, focus: candidate.photoFocus ?? PORTRAIT_FOCUS };
    }
    return candidate.cover
      ? { url: candidate.cover, focus: candidate.coverFocus ?? PORTRAIT_FOCUS }
      : null;
  }

  /** Résumé d'une ligne : seules les informations renseignées y figurent. */
  protected summary(candidate: AdminCandidate): string {
    return [candidate.position, candidate.constituency].filter(Boolean).join(' · ');
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
