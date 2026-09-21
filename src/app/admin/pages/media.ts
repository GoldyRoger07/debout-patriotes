import { Component } from '@angular/core';
import { ImageGallery } from '../ui/image-gallery';

/**
 * Médiathèque : toutes les images du site, rangées par usage. C'est ici qu'on ajoute des visuels
 * à l'avance et qu'on fait le ménage ; les formulaires y piochent ensuite (bouton « Médiathèque »).
 */
@Component({
  selector: 'admin-media',
  imports: [ImageGallery],
  template: `
    <h1 class="font-heading text-2xl font-extrabold text-secondary">Médiathèque</h1>
    <p class="mt-1 text-sm text-foreground-muted">
      Les images hébergées sur ImageKit. Celles marquées « Utilisée » illustrent un article ou une
      fiche candidat : retirez-les de ce contenu avant de les supprimer.
    </p>

    <div class="admin-card mt-8">
      <admin-image-gallery startFolder="blog" />
    </div>
  `,
})
export default class Media {}
