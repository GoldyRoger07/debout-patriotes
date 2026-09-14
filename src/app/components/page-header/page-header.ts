import { Component, input } from '@angular/core';
import { Container } from '../container/container';

/** Bandeau d'en-tête commun à toutes les pages intérieures. */
@Component({
  selector: 'my-page-header',
  imports: [Container],
  templateUrl: './page-header.html',
})
export class PageHeader {
  eyebrow = input<string>();
  title = input.required<string>();
  lead = input<string>();
}
