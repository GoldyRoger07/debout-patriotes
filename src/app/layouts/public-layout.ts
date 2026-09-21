import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header2 } from '../components/header2/header2';
import { Footer } from '../components/footer/footer';

/** Habillage du site public : en-tête, contenu de la page, pied de page. */
@Component({
  selector: 'app-public-layout',
  imports: [RouterOutlet, Header2, Footer],
  template: `
    <my-header-2 />

    <main id="contenu">
      <router-outlet />
    </main>

    <my-footer />
  `,
})
export class PublicLayout {}
