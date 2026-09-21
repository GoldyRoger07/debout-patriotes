import { Component, OnDestroy, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { Feedback } from '../core/feedback.service';
import { ImagePicker } from '../core/image-picker.service';
import { ImagePickerDialog } from '../ui/image-picker';

/**
 * Racine de `/admin` : héberge les notifications, la boîte de confirmation et la médiathèque,
 * et interdit l'indexation du back-office.
 */
@Component({
  selector: 'admin-shell',
  imports: [RouterOutlet, ImagePickerDialog],
  template: `
    <router-outlet />

    <!-- Médiathèque : choix d'une image déjà en ligne -->
    @if (picker.request()) {
      <admin-image-picker />
    }

    <!-- Notifications -->
    <div
      class="pointer-events-none fixed right-4 bottom-4 z-[60] flex w-full max-w-sm flex-col gap-2"
      aria-live="polite"
    >
      @for (toast of feedback.toasts(); track toast.id) {
        <div
          class="pointer-events-auto flex items-start gap-3 rounded-md border bg-white p-4 text-sm shadow-card"
          [class]="toast.kind === 'success' ? 'border-green-200' : 'border-red-200'"
          [attr.role]="toast.kind === 'error' ? 'alert' : 'status'"
        >
          <i
            class="pi mt-0.5"
            [class]="
              toast.kind === 'success'
                ? 'pi-check-circle text-success'
                : 'pi-exclamation-triangle text-danger'
            "
            aria-hidden="true"
          ></i>
          <p class="flex-1 text-secondary">{{ toast.text }}</p>
          <button
            type="button"
            class="text-foreground-muted hover:text-secondary"
            aria-label="Fermer"
            (click)="feedback.dismiss(toast.id)"
          >
            <i class="pi pi-times text-xs" aria-hidden="true"></i>
          </button>
        </div>
      }
    </div>

    <!-- Confirmation -->
    @if (feedback.confirmation(); as request) {
      <div
        class="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 p-4"
        (click)="feedback.answer(false)"
      >
        <div
          class="w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="confirm-title"
          (click)="$event.stopPropagation()"
          (keydown.escape)="feedback.answer(false)"
        >
          <h2 id="confirm-title" class="font-heading text-lg font-bold text-secondary">
            {{ request.title }}
          </h2>
          <p class="mt-2 text-sm leading-relaxed text-foreground-muted">{{ request.message }}</p>
          <div class="mt-6 flex justify-end gap-2">
            <button
              type="button"
              class="admin-btn admin-btn-ghost"
              (click)="feedback.answer(false)"
            >
              Annuler
            </button>
            <button
              type="button"
              class="admin-btn"
              [class]="request.danger ? 'admin-btn-danger' : 'admin-btn-primary'"
              (click)="feedback.answer(true)"
              autofocus
            >
              {{ request.confirmLabel ?? 'Confirmer' }}
            </button>
          </div>
        </div>
      </div>
    }
  `,
})
export class AdminShell implements OnDestroy {
  protected readonly feedback = inject(Feedback);
  protected readonly picker = inject(ImagePicker);
  private readonly meta = inject(Meta);

  constructor() {
    this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
  }

  ngOnDestroy(): void {
    this.meta.removeTag('name="robots"');
  }
}
