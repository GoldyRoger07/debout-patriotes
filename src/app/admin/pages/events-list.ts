import { Component, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminApi } from '../core/admin-api.service';
import { Feedback } from '../core/feedback.service';
import { apiErrorMessage } from '../core/api-error';
import { AgendaEvent } from '../../models/event.model';
import { ImageKitPipe } from '../../pipes/imagekit.pipe';

/** Agenda : tous les événements, du plus lointain au plus ancien. */
@Component({
  selector: 'admin-events-list',
  imports: [RouterLink, DatePipe, ImageKitPipe],
  template: `
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 class="font-heading text-2xl font-extrabold text-secondary">Événements</h1>
        <p class="mt-1 text-sm text-foreground-muted">
          Agenda de la page « Événements » : à venir, puis passés une fois la date atteinte.
        </p>
      </div>
      <a routerLink="/admin/evenements/nouveau" class="admin-btn admin-btn-primary">
        <i class="pi pi-plus" aria-hidden="true"></i> Nouvel événement
      </a>
    </div>

    <div class="mt-8 overflow-hidden rounded-lg border border-gray-200 bg-white">
      @if (events(); as list) {
        @if (list.length) {
          <ul class="divide-y divide-gray-100">
            @for (event of list; track event.id) {
              <li class="flex items-center gap-4 p-4" [class.opacity-60]="!event.published">
                <div class="hidden h-14 w-24 shrink-0 overflow-hidden rounded bg-surface sm:block">
                  @if (event.cover) {
                    <img [src]="event.cover | ik: 'w-192,h-112' : (event.coverFocus ?? 'auto')" alt="" class="h-full w-full object-cover" />
                  } @else {
                    <div class="flex h-full items-center justify-center text-gray-300">
                      <i class="pi pi-calendar" aria-hidden="true"></i>
                    </div>
                  }
                </div>

                <div class="min-w-0 flex-1">
                  <a [routerLink]="['/admin/evenements', event.id]" class="block truncate font-semibold text-secondary hover:text-primary">
                    {{ event.title }}
                  </a>
                  <p class="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-foreground-muted">
                    @if (!event.published) {
                      <span class="rounded-full bg-gray-100 px-2 py-0.5 font-semibold text-gray-600">Masqué</span>
                    } @else if (isPast(event)) {
                      <span class="rounded-full bg-gray-100 px-2 py-0.5 font-semibold text-gray-600">Passé</span>
                    } @else {
                      <span class="rounded-full bg-green-50 px-2 py-0.5 font-semibold text-success">À venir</span>
                    }
                    <span>{{ event.startsAt | date: 'd MMM y, HH:mm' }}</span>
                    @if (event.city) {
                      <span>{{ event.city }}</span>
                    }
                    @if (event.video) {
                      <span><i class="pi pi-video mr-1 text-[10px]" aria-hidden="true"></i>Vidéo</span>
                    }
                  </p>
                </div>

                <div class="flex shrink-0 items-center gap-1">
                  <a
                    [routerLink]="['/admin/evenements', event.id]"
                    class="rounded p-2 text-foreground-muted hover:bg-gray-100 hover:text-secondary"
                    title="Modifier"
                  >
                    <i class="pi pi-pencil" aria-hidden="true"></i><span class="sr-only">Modifier</span>
                  </a>
                  <button
                    type="button"
                    class="rounded p-2 text-foreground-muted hover:bg-red-50 hover:text-danger"
                    title="Supprimer"
                    (click)="remove(event)"
                  >
                    <i class="pi pi-trash" aria-hidden="true"></i><span class="sr-only">Supprimer</span>
                  </button>
                </div>
              </li>
            }
          </ul>
        } @else {
          <div class="p-12 text-center text-sm text-foreground-muted">
            <i class="pi pi-calendar mb-3 text-3xl text-gray-300" aria-hidden="true"></i>
            <p>Aucun événement pour le moment.</p>
          </div>
        }
      } @else {
        <div class="p-12 text-center text-foreground-muted">
          <i class="pi pi-spin pi-spinner" aria-hidden="true"></i>
        </div>
      }
    </div>
  `,
})
export default class EventsList {
  private readonly api = inject(AdminApi);
  private readonly feedback = inject(Feedback);
  private readonly now = Date.now();

  protected readonly events = signal<AgendaEvent[] | null>(null);

  constructor() {
    this.load();
  }

  protected isPast(event: AgendaEvent): boolean {
    return new Date(event.startsAt).getTime() < this.now;
  }

  protected async remove(event: AgendaEvent): Promise<void> {
    const confirmed = await this.feedback.confirm({
      title: 'Supprimer cet événement ?',
      message: `« ${event.title} » sera définitivement supprimé, avec sa couverture et sa vidéo.`,
      confirmLabel: 'Supprimer',
      danger: true,
    });
    if (confirmed) {
      this.api.deleteEvent(event.id).subscribe({
        next: () => {
          this.feedback.success('Événement supprimé.');
          this.load();
        },
        error: (err) => this.feedback.error(apiErrorMessage(err)),
      });
    }
  }

  private load(): void {
    this.api.events().subscribe({
      next: (events) => this.events.set(events),
      error: (err) => {
        this.events.set([]);
        this.feedback.error(apiErrorMessage(err));
      },
    });
  }
}
