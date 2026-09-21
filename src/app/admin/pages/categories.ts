import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { AdminApi } from '../core/admin-api.service';
import { Feedback } from '../core/feedback.service';
import { apiErrorMessage } from '../core/api-error';
import { Category } from '../../models/blog.model';

/** Rubriques du blog : proposées comme filtres sur la page « Actualités », dans cet ordre. */
@Component({
  selector: 'admin-categories',
  imports: [FormsModule],
  template: `
    <h1 class="font-heading text-2xl font-extrabold text-secondary">Rubriques</h1>
    <p class="mt-1 text-sm text-foreground-muted">
      Proposées comme filtres sur la page « Actualités », dans l'ordre ci-dessous.
    </p>

    <form class="admin-card mt-8 flex flex-wrap items-end gap-3" (ngSubmit)="create()">
      <div class="min-w-60 flex-1">
        <label class="admin-label" for="new-category">Nouvelle rubrique</label>
        <input
          id="new-category"
          name="name"
          class="admin-input"
          [(ngModel)]="newName"
          placeholder="Ex. : Diaspora"
          maxlength="80"
        />
      </div>
      <button
        type="submit"
        class="admin-btn admin-btn-primary"
        [disabled]="!newName.trim() || busy()"
      >
        <i class="pi pi-plus" aria-hidden="true"></i> Ajouter
      </button>
    </form>

    <div class="mt-6 overflow-hidden rounded-lg border border-gray-200 bg-white">
      @if (categories(); as list) {
        @if (list.length) {
          <ul class="divide-y divide-gray-100">
            @for (category of list; track category.id; let first = $first, last = $last) {
              <li class="flex flex-wrap items-center gap-3 p-4">
                <div class="flex flex-col">
                  <button
                    type="button"
                    class="px-1 text-foreground-muted hover:text-primary disabled:opacity-30"
                    [disabled]="first || busy()"
                    (click)="move(category, -1)"
                    title="Monter"
                  >
                    <i class="pi pi-chevron-up text-xs" aria-hidden="true"></i
                    ><span class="sr-only">Monter</span>
                  </button>
                  <button
                    type="button"
                    class="px-1 text-foreground-muted hover:text-primary disabled:opacity-30"
                    [disabled]="last || busy()"
                    (click)="move(category, 1)"
                    title="Descendre"
                  >
                    <i class="pi pi-chevron-down text-xs" aria-hidden="true"></i
                    ><span class="sr-only">Descendre</span>
                  </button>
                </div>

                @if (editingId() === category.id) {
                  <input
                    class="admin-input max-w-xs"
                    [(ngModel)]="editName"
                    [attr.aria-label]="'Nouveau nom de ' + category.name"
                    maxlength="80"
                    (keydown.enter)="rename(category)"
                    (keydown.escape)="editingId.set(null)"
                  />
                  <button
                    type="button"
                    class="admin-btn admin-btn-primary"
                    [disabled]="busy()"
                    (click)="rename(category)"
                  >
                    Enregistrer
                  </button>
                  <button
                    type="button"
                    class="admin-btn admin-btn-ghost"
                    (click)="editingId.set(null)"
                  >
                    Annuler
                  </button>
                } @else {
                  <div class="min-w-0 flex-1">
                    <p class="font-semibold text-secondary">{{ category.name }}</p>
                    <p class="text-xs text-foreground-muted">
                      /{{ category.slug }} · {{ category.postCount ?? 0 }} article{{
                        (category.postCount ?? 0) > 1 ? 's' : ''
                      }}
                    </p>
                  </div>
                  <button
                    type="button"
                    class="rounded p-2 text-foreground-muted hover:bg-gray-100 hover:text-secondary"
                    title="Renommer"
                    (click)="startEdit(category)"
                  >
                    <i class="pi pi-pencil" aria-hidden="true"></i
                    ><span class="sr-only">Renommer</span>
                  </button>
                  <button
                    type="button"
                    class="rounded p-2 text-foreground-muted hover:bg-red-50 hover:text-danger"
                    title="Supprimer"
                    (click)="remove(category)"
                  >
                    <i class="pi pi-trash" aria-hidden="true"></i
                    ><span class="sr-only">Supprimer</span>
                  </button>
                }
              </li>
            }
          </ul>
        } @else {
          <p class="p-12 text-center text-sm text-foreground-muted">
            Aucune rubrique. Les articles peuvent aussi être publiés sans rubrique.
          </p>
        }
      } @else {
        <div class="p-12 text-center text-foreground-muted">
          <i class="pi pi-spin pi-spinner" aria-hidden="true"></i>
        </div>
      }
    </div>
  `,
})
export default class Categories {
  private readonly api = inject(AdminApi);
  private readonly feedback = inject(Feedback);

  protected readonly categories = signal<Category[] | null>(null);
  protected readonly busy = signal(false);
  protected readonly editingId = signal<number | null>(null);
  protected newName = '';
  protected editName = '';

  constructor() {
    this.reload();
  }

  protected create(): void {
    const name = this.newName.trim();
    if (!name) {
      return;
    }
    this.run(this.api.saveCategory(null, { name }), 'Rubrique ajoutée.', () => (this.newName = ''));
  }

  protected startEdit(category: Category): void {
    this.editName = category.name;
    this.editingId.set(category.id);
  }

  protected rename(category: Category): void {
    const name = this.editName.trim();
    if (!name) {
      return;
    }
    // Le slug suit le nouveau nom.
    this.run(
      this.api.saveCategory(category.id, { name, displayOrder: category.displayOrder }),
      'Rubrique renommée.',
      () => this.editingId.set(null),
    );
  }

  /** Échange la position de la rubrique avec sa voisine. */
  protected move(category: Category, direction: -1 | 1): void {
    const list = this.categories() ?? [];
    const index = list.findIndex((c) => c.id === category.id);
    const neighbour = list[index + direction];
    if (!neighbour) {
      return;
    }
    // Numérote toute la liste pour éviter les égalités d'ordre, puis échange les deux positions.
    const ordered = list.map((c, i) => ({ ...c, displayOrder: i + 1 }));
    [ordered[index].displayOrder, ordered[index + direction].displayOrder] = [
      index + direction + 1,
      index + 1,
    ];
    const changed = ordered.filter((c, i) => c.displayOrder !== list[i].displayOrder);
    this.busy.set(true);
    let pending = changed.length;
    for (const c of changed) {
      this.api
        .saveCategory(c.id, { name: c.name, slug: c.slug, displayOrder: c.displayOrder })
        .subscribe({
          next: () => --pending === 0 && this.reload(),
          error: (err) => {
            this.feedback.error(apiErrorMessage(err));
            this.reload();
          },
        });
    }
  }

  protected async remove(category: Category): Promise<void> {
    const count = category.postCount ?? 0;
    const confirmed = await this.feedback.confirm({
      title: `Supprimer « ${category.name} » ?`,
      message: count
        ? `${count} article${count > 1 ? 's resteront' : ' restera'} en ligne, sans rubrique.`
        : 'Aucun article n’est rattaché à cette rubrique.',
      confirmLabel: 'Supprimer',
      danger: true,
    });
    if (confirmed) {
      this.run(this.api.deleteCategory(category.id), 'Rubrique supprimée.');
    }
  }

  private run(request: Observable<unknown>, message: string, then?: () => void): void {
    this.busy.set(true);
    request.subscribe({
      next: () => {
        this.feedback.success(message);
        then?.();
        this.reload();
      },
      error: (err) => {
        this.busy.set(false);
        this.feedback.error(apiErrorMessage(err));
      },
    });
  }

  private reload(): void {
    this.api.categories().subscribe({
      next: (list) => {
        this.categories.set(list);
        this.busy.set(false);
      },
      error: (err) => {
        this.categories.set([]);
        this.busy.set(false);
        this.feedback.error(apiErrorMessage(err));
      },
    });
  }
}
