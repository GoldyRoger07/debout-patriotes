import { Component, HostListener, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { Container } from '../container/container';
import { Dropdown } from '../dropdown/dropdown';
import { LanguageService } from '../../services/language.service';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'my-header-2',
  imports: [Container, Dropdown, RouterLink, RouterLinkActive],
  templateUrl: './header2.html',
  styleUrl: './header2.css',
})
export class Header2 {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly router = inject(Router);

  private readonly content = inject(LanguageService).content;

  protected readonly company = inject(CompanyService).company;
  protected readonly navItems = computed(() => this.content().nav);

  protected readonly menuOpen = signal(false);
  /** Sous-menu mobile actuellement déplié. */
  protected readonly openSection = signal<string | null>(null);
  /** Masque le header au scroll vers le bas. */
  protected readonly hidden = signal(false);
  /** Passe le header en fond opaque dès qu'on quitte le haut de page. */
  protected readonly scrolled = signal(false);

  private lastScrollY = 0;

  constructor() {
    // Un changement de route doit refermer le menu mobile.
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.closeMenu());
  }

  @HostListener('window:scroll')
  protected onScroll(): void {
    if (!this.isBrowser) {
      return;
    }

    const current = window.scrollY;
    this.scrolled.set(current > 12);

    // Le header reste visible tant que le menu mobile est ouvert.
    if (this.menuOpen()) {
      this.lastScrollY = current;
      return;
    }

    if (current > this.lastScrollY && current > 120) {
      this.hidden.set(true);
    } else if (current < this.lastScrollY) {
      this.hidden.set(false);
    }

    this.lastScrollY = current;
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    this.closeMenu();
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
    this.lockScroll(this.menuOpen());
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
    this.openSection.set(null);
    this.lockScroll(false);
  }

  protected toggleSection(label: string): void {
    this.openSection.update((current) => (current === label ? null : label));
  }

  /** Empêche la page de défiler derrière l'overlay mobile. */
  private lockScroll(locked: boolean): void {
    if (this.isBrowser) {
      document.body.style.overflow = locked ? 'hidden' : '';
    }
  }
}
