import { Component, input } from '@angular/core';

/** Titre de section, avec filet rouge et chapô optionnel. */
@Component({
  selector: 'my-section-title',
  imports: [],
  templateUrl: './section-title.html',
})
export class SectionTitle {
  eyebrow = input<string>();
  heading = input.required<string>();
  lead = input<string>();
  /** 'left' par défaut ; 'center' pour les sections pleine largeur. */
  align = input<'left' | 'center'>('left');
  /** Inverse les couleurs pour un fond sombre. */
  invert = input(false);
}
