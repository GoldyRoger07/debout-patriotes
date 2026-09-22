import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Candidate } from '../../models/content.model';
import { ImageKitPipe } from '../../pipes/imagekit.pipe';

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

  /**
   * Visuel de la carte : la photo de couverture si elle existe, sinon le portrait de la fiche.
   * Le portrait est recadré sur le visage, la couverture au centre de l'image.
   */
  protected readonly image = computed(() => {
    const { cover, photo } = this.candidate();
    if (cover) {
      return { url: cover, transformation: 'w-400,h-500' };
    }
    return photo ? { url: photo, transformation: 'w-400,h-500,fo-face' } : null;
  });

  /** Sous-titre, ou à défaut la première information renseignée. */
  protected readonly subtitle = computed(() => {
    const c = this.candidate();
    return c.subtitle || c.position || c.professions?.[0] || null;
  });
}
