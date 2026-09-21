import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Candidate } from '../../models/content.model';
import { ImageKitPipe } from '../../pipes/imagekit.pipe';

/** Carte portrait d'un candidat : photo, nom et sous-titre. Mène à sa fiche. */
@Component({
  selector: 'my-candidate-card',
  imports: [RouterLink, ImageKitPipe],
  templateUrl: './candidate-card.html',
})
export class CandidateCard {
  candidate = input.required<Candidate>();
  /** Copie purement visuelle (ex. doublon du défilement) : retirée de la navigation clavier. */
  decorative = input(false);
}
