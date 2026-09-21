import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { catchError, of } from 'rxjs';
import { AdminApi } from '../core/admin-api.service';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'admin-dashboard',
  imports: [RouterLink],
  template: `
    <h1 class="font-heading text-2xl font-extrabold text-secondary">
      Bonjour {{ user()?.displayName }}
    </h1>
    <p class="mt-1 text-sm text-foreground-muted">
      Les contenus publiés ici apparaissent immédiatement sur le site.
    </p>

    @if (stats(); as s) {
      @if (!s.imageKitConfigured) {
        <div
          class="mt-6 flex gap-3 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-warning"
          role="alert"
        >
          <i class="pi pi-exclamation-triangle mt-0.5" aria-hidden="true"></i>
          <p>
            ImageKit n'est pas configuré sur l'API : le téléversement d'images est indisponible.
            Renseignez
            <code>IMAGEKIT_PRIVATE_KEY</code>, <code>IMAGEKIT_PUBLIC_KEY</code> et
            <code>IMAGEKIT_URL_ENDPOINT</code>.
          </p>
        </div>
      }

      <div class="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        @for (
          card of [
            {
              label: 'Articles publiés',
              value: s.publishedPosts,
              icon: 'pi-megaphone',
              url: '/admin/articles',
            },
            { label: 'Brouillons', value: s.draftPosts, icon: 'pi-pencil', url: '/admin/articles' },
            {
              label: 'Candidats en ligne',
              value: s.publishedCandidates,
              icon: 'pi-users',
              url: '/admin/candidats',
            },
            {
              label: 'Candidats au total',
              value: s.totalCandidates,
              icon: 'pi-user-edit',
              url: '/admin/candidats',
            },
          ];
          track card.label
        ) {
          <a [routerLink]="card.url" class="admin-card transition-colors hover:border-primary/40">
            <i class="pi {{ card.icon }} text-primary" aria-hidden="true"></i>
            <p class="mt-3 font-heading text-3xl font-extrabold text-secondary">{{ card.value }}</p>
            <p class="text-sm text-foreground-muted">{{ card.label }}</p>
          </a>
        }
      </div>
    } @else if (stats() === null) {
      <p class="mt-8 rounded-md bg-red-50 p-4 text-sm text-danger" role="alert">
        Impossible de charger le tableau de bord : l'API est-elle démarrée ?
      </p>
    }

    <h2 class="mt-12 font-heading text-lg font-bold text-secondary">Actions rapides</h2>
    <div class="mt-4 flex flex-wrap gap-3">
      <a routerLink="/admin/articles/nouveau" class="admin-btn admin-btn-primary">
        <i class="pi pi-plus" aria-hidden="true"></i> Rédiger un article
      </a>
      <a routerLink="/admin/candidats/nouveau" class="admin-btn admin-btn-ghost">
        <i class="pi pi-user-plus" aria-hidden="true"></i> Ajouter un candidat
      </a>
      <a routerLink="/admin/rubriques" class="admin-btn admin-btn-ghost">
        <i class="pi pi-tags" aria-hidden="true"></i> Gérer les rubriques
      </a>
    </div>
  `,
})
export default class Dashboard {
  protected readonly user = inject(AuthService).user;
  /** `undefined` pendant le chargement, `null` en cas d'erreur. */
  protected readonly stats = toSignal(
    inject(AdminApi)
      .dashboard()
      .pipe(catchError(() => of(null))),
  );
}
