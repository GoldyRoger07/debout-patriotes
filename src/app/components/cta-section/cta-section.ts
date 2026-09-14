import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Container } from '../container/container';
import { CtaContent } from '../../models/content.model';

/** Bandeau d'appel à l'action fermant la plupart des pages. */
@Component({
  selector: 'my-cta-section',
  imports: [Container, RouterLink],
  templateUrl: './cta-section.html',
})
export class CtaSection {
  cta = input.required<CtaContent>();
}
