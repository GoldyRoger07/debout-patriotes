import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { LanguageService } from './language.service';

/** Données SEO facultatives portées par une route (`data`). */
export interface RouteSeo {
  description?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly meta = inject(Meta);
  private readonly titleService = inject(Title);
  private readonly content = inject(LanguageService).content;

  init(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.deepestRoute().snapshot.data['seo'] as RouteSeo | undefined),
      )
      .subscribe((seo) => this.apply(seo));
  }

  private apply(seo: RouteSeo | undefined): void {
    const fallback = this.content().meta.description;
    const description = seo?.description ?? fallback;
    // `Title` est sûr côté serveur, contrairement à l'accès direct à `document`.
    const title = this.titleService.getTitle() || this.content().meta.name;

    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:title', content: title });
  }

  private deepestRoute(): ActivatedRoute {
    let route = this.route;
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }
}
