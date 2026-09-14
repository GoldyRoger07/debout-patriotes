import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Container } from '../../components/container/container';
import { PageHeader } from '../../components/page-header/page-header';
import { SectionTitle } from '../../components/section-title/section-title';
import { FeatureGrid } from '../../components/feature-grid/feature-grid';
import { LanguageService } from '../../services/language.service';

/** Départements d'Haïti, plus une option pour la diaspora. */
const DEPARTEMENTS = [
  'Artibonite',
  'Centre',
  'Grand’Anse',
  'Nippes',
  'Nord',
  'Nord-Est',
  'Nord-Ouest',
  'Ouest',
  'Sud',
  'Sud-Est',
  'Diaspora',
];

@Component({
  selector: 'app-devenir-membre',
  imports: [Container, PageHeader, SectionTitle, FeatureGrid, ReactiveFormsModule],
  templateUrl: './devenir-membre.html',
})
export default class DevenirMembre {
  private readonly content = inject(LanguageService).content;
  private readonly fb = inject(FormBuilder);

  protected readonly page = computed(() => this.content().join);
  protected readonly departements = DEPARTEMENTS;
  protected readonly submitted = signal(false);
  protected readonly openQuestion = signal<number | null>(0);

  protected readonly form = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    departement: ['', Validators.required],
    profile: ['', Validators.required],
    skills: [''],
    message: [''],
    consent: [false, Validators.requiredTrue],
  });

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // TODO : brancher sur l'API du groupement (envoi au secrétariat aux adhésions).
    this.submitted.set(true);
    this.form.reset();
  }

  protected toggleQuestion(index: number): void {
    this.openQuestion.update((current) => (current === index ? null : index));
  }

  /** Vrai si le champ doit afficher son message d'erreur. */
  protected invalid(name: string): boolean {
    const control = this.form.get(name);
    return !!control && control.invalid && control.touched;
  }
}
