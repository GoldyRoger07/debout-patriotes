import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { AuthService } from '../core/auth.service';

/** Habillage des pages du back-office : navigation latérale et barre supérieure. */
@Component({
  selector: 'admin-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin-layout.html',
})
export class AdminLayout {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly user = this.auth.user;
  protected readonly menuOpen = signal(false);

  protected readonly nav = [
    { label: 'Tableau de bord', url: '/admin', icon: 'pi-home', exact: true },
    { label: 'Articles', url: '/admin/articles', icon: 'pi-file-edit', exact: false },
    { label: 'Rubriques', url: '/admin/rubriques', icon: 'pi-tags', exact: false },
    { label: 'Candidats', url: '/admin/candidats', icon: 'pi-users', exact: false },
    { label: 'Médiathèque', url: '/admin/medias', icon: 'pi-images', exact: false },
    { label: 'Mon compte', url: '/admin/compte', icon: 'pi-user-edit', exact: false },
  ];

  constructor() {
    // Referme le menu mobile après chaque navigation.
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.menuOpen.set(false));
  }

  protected logout(): void {
    this.auth.logout();
    this.router.navigateByUrl('/admin/connexion');
  }
}
