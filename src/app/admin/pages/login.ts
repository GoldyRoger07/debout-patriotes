import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { apiErrorMessage } from '../core/api-error';

@Component({
  selector: 'admin-login',
  imports: [ReactiveFormsModule],
  template: `
    <div class="flex min-h-screen items-center justify-center bg-secondary px-4">
      <div class="w-full max-w-sm">
        <div class="mb-8 text-center text-white">
          <img src="logo-debout-patriotes.png" alt="" class="mx-auto h-20 w-auto" />
          <h1 class="mt-4 font-heading text-2xl font-extrabold">Back-office</h1>
          <p class="mt-1 text-sm text-white/60">Gestion du blog et des candidats</p>
        </div>

        <form class="rounded-lg bg-white p-6 shadow-xl" [formGroup]="form" (ngSubmit)="submit()">
          <div class="flex flex-col gap-4">
            <div>
              <label class="admin-label" for="email">Adresse e-mail</label>
              <input
                id="email"
                type="email"
                class="admin-input"
                formControlName="email"
                autocomplete="username"
              />
            </div>
            <div>
              <label class="admin-label" for="password">Mot de passe</label>
              <input
                id="password"
                type="password"
                class="admin-input"
                formControlName="password"
                autocomplete="current-password"
              />
            </div>

            @if (error()) {
              <p class="rounded-md bg-red-50 px-3 py-2 text-sm text-danger" role="alert">
                {{ error() }}
              </p>
            }

            <button
              type="submit"
              class="admin-btn admin-btn-primary w-full py-2.5"
              [disabled]="loading()"
            >
              @if (loading()) {
                <i class="pi pi-spin pi-spinner" aria-hidden="true"></i>
              }
              Se connecter
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
})
export default class Login {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected readonly form = inject(NonNullableFormBuilder).group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  protected readonly loading = signal(false);
  protected readonly error = signal<string | null>(null);

  constructor() {
    if (this.auth.isAuthenticated()) {
      this.router.navigateByUrl('/admin');
    }
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.error.set('Renseignez votre adresse e-mail et votre mot de passe.');
      return;
    }
    const { email, password } = this.form.getRawValue();
    this.loading.set(true);
    this.error.set(null);
    this.auth.login(email, password).subscribe({
      next: () => {
        const back = this.route.snapshot.queryParamMap.get('retour');
        this.router.navigateByUrl(back?.startsWith('/admin') ? back : '/admin');
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(apiErrorMessage(err, 'Connexion impossible.'));
      },
    });
  }
}
