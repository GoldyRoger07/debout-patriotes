import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Container } from '../container/container';
import { CtaContent } from '../../models/content.model';
import { LocalizePipe } from '../../pipes/localize.pipe';

/** Bandeau d'appel à l'action fermant la plupart des pages. */
@Component({
  selector: 'my-cta-section',
  imports: [Container, RouterLink, LocalizePipe],
  templateUrl: './cta-section.html',
})
export class CtaSection {
  cta = input.required<CtaContent>();
}
