import { Component, input } from '@angular/core';
import { Feature } from '../../models/content.model';

/** Grille de cartes « icône + titre + texte », réutilisée sur presque toutes les pages. */
@Component({
  selector: 'my-feature-grid',
  imports: [],
  templateUrl: './feature-grid.html',
})
export class FeatureGrid {
  items = input.required<Feature[]>();
  /** Nombre de colonnes sur grand écran. */
  cols = input<2 | 3 | 4>(3);
  /** Carte sur fond clair (défaut) ou sur fond sombre. */
  invert = input(false);

  protected gridClass(): string {
    const map = {
      2: 'sm:grid-cols-2',
      3: 'sm:grid-cols-2 lg:grid-cols-3',
      4: 'sm:grid-cols-2 lg:grid-cols-4',
    } as const;
    return map[this.cols()];
  }
}
