import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AdminApi } from '../core/admin-api.service';
import { AuthService } from '../core/auth.service';
import { Feedback } from '../core/feedback.service';
import { apiErrorMessage } from '../core/api-error';

const samePasswords = (group: AbstractControl): ValidationErrors | null =>
  group.get('newPassword')?.value === group.get('confirmation')?.value ? null : { mismatch: true };

@Component({
  selector: 'admin-account',
  imports: [ReactiveFormsModule],
  template: `
    <h1 class="font-heading text-2xl font-extrabold text-secondary">Mon compte</h1>
    @if (user(); as u) {
      <p class="mt-1 text-sm text-foreground-muted">{{ u.displayName }} · {{ u.email }}</p>
    }

    <form
      class="admin-card mt-8 flex max-w-md flex-col gap-4"
      [formGroup]="form"
      (ngSubmit)="submit()"
    >
      <h2 class="font-heading text-base font-bold text-secondary">Changer de mot de passe</h2>
      <div>
        <label class="admin-label" for="current">Mot de passe actuel</label>
        <input
          id="current"
          type="password"
          class="admin-input"
          formControlName="currentPassword"
          autocomplete="current-password"
        />
      </div>
      <div>
        <label class="admin-label" for="new">Nouveau mot de passe</label>
        <input
          id="new"
          type="password"
          class="admin-input"
          formControlName="newPassword"
          autocomplete="new-password"
        />
        <p class="mt-1 text-xs text-foreground-muted">8 caractères minimum.</p>
      </div>
      <div>
        <label class="admin-label" for="confirmation">Confirmation</label>
        <input
          id="confirmation"
          type="password"
          class="admin-input"
          formControlName="confirmation"
          autocomplete="new-password"
        />
        @if (form.errors?.['mismatch'] && form.controls.confirmation.touched) {
          <p class="mt-1 text-xs text-danger">Les deux mots de passe ne correspondent pas.</p>
        }
      </div>
      <button type="submit" class="admin-btn admin-btn-primary self-start" [disabled]="saving()">
        <i class="pi" [class]="saving() ? 'pi-spin pi-spinner' : 'pi-key'" aria-hidden="true"></i>
        Mettre à jour
      </button>
    </form>
  `,
})
export default class Account {
  private readonly api = inject(AdminApi);
  private readonly feedback = inject(Feedback);

  protected readonly user = inject(AuthService).user;
  protected readonly saving = signal(false);
  protected readonly form = inject(NonNullableFormBuilder).group(
    {
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmation: ['', Validators.required],
    },
    { validators: samePasswords },
  );

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.feedback.error(
        'Vérifiez les trois champs (8 caractères minimum pour le nouveau mot de passe).',
      );
      return;
    }
    const { currentPassword, newPassword } = this.form.getRawValue();
    this.saving.set(true);
    this.api.changePassword(currentPassword, newPassword).subscribe({
      next: () => {
        this.saving.set(false);
        this.form.reset();
        this.feedback.success('Mot de passe mis à jour.');
      },
      error: (err) => {
        this.saving.set(false);
        this.feedback.error(apiErrorMessage(err));
      },
    });
  }
}
