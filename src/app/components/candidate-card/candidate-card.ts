import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Candidate } from '../../models/content.model';
import { ImageKitPipe } from '../../pipes/imagekit.pipe';
import { DEFAULT_CARD_RATIO, ImageRatio, PORTRAIT_FOCUS } from '../../models/image.model';

/** Carte d'un candidat : photo de couverture, nom et sous-titre. Mène à sa fiche. */
@Component({
  selector: 'my-candidate-card',
  imports: [RouterLink, ImageKitPipe],
  templateUrl: './candidate-card.html',
})
export class CandidateCard {
  candidate = input.required<Candidate>();
  /** Copie purement visuelle (ex. doublon du défilement) : retirée de la navigation clavier. */
  decorative = input(false);
  /** Proportion de la photo, réglée par emplacement dans le back-office : toutes les cartes d'une page la partagent. */
  ratio = input<ImageRatio>(DEFAULT_CARD_RATIO);

  /** Valeur CSS `aspect-ratio` du cadre. */
  protected readonly aspectRatio = computed(() => `${this.ratio().width} / ${this.ratio().height}`);

  /** Boîte ImageKit de 400 px de large, à la proportion de la carte. */
  protected readonly size = computed(
    () => `w-400,h-${Math.round((400 * this.ratio().height) / this.ratio().width)}`,
  );

  /**
   * Visuel de la carte : la photo de couverture si elle existe, sinon le portrait de la fiche.
   * La carte garde la proportion de son emplacement ; le cadrage choisi dans le back-office décide de ce qui en est gardé.
   */
  protected readonly image = computed(() => {
    const { cover, coverFocus, photo, photoFocus } = this.candidate();
    if (cover) {
      return { url: cover, focus: coverFocus ?? PORTRAIT_FOCUS };
    }
    return photo ? { url: photo, focus: photoFocus ?? PORTRAIT_FOCUS } : null;
  });

  /** Sous-titre, ou à défaut la première information renseignée. */
  protected readonly subtitle = computed(() => {
    const c = this.candidate();
    return c.subtitle || c.position || c.professions?.[0] || null;
  });
}
