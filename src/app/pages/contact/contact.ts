import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Container } from '../../components/container/container';
import { PageHeader } from '../../components/page-header/page-header';
import { SectionTitle } from '../../components/section-title/section-title';
import { FeatureGrid } from '../../components/feature-grid/feature-grid';
import { LanguageService } from '../../services/language.service';
import { SocialService } from '../../services/social.service';

@Component({
  selector: 'app-contact',
  imports: [Container, PageHeader, SectionTitle, FeatureGrid, ReactiveFormsModule],
  templateUrl: './contact.html',
})
export default class Contact {
  private readonly content = inject(LanguageService).content;
  private readonly fb = inject(FormBuilder);

  protected readonly page = computed(() => this.content().contact);
  protected readonly networks = inject(SocialService).enabledNetworks;
  protected readonly submitted = signal(false);

  protected readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // TODO : brancher sur l'API du groupement (envoi au secrétariat général).
    this.submitted.set(true);
    this.form.reset();
  }

  /** Vrai si le champ doit afficher son message d'erreur. */
  protected invalid(name: string): boolean {
    const control = this.form.get(name);
    return !!control && control.invalid && control.touched;
  }
}
