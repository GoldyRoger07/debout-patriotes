import { RESPONSE_INIT, inject } from '@angular/core';
import { CanActivateFn, ResolveFn, Route, Routes } from '@angular/router';
import { map, tap } from 'rxjs';
import { RouteSeo } from './services/seo.service';
import { CandidatesApi } from './services/candidates-api.service';
import { BlogApi } from './services/blog-api.service';
import { CATALOG, LOCALE_PREFIX, LanguageService, Locale } from './services/language.service';
import { Candidate, SeoPage } from './models/content.model';
import { Post } from './models/blog.model';
import { PublicLayout } from './layouts/public-layout';

/** Page introuvable : renvoie un vrai 404 au rendu serveur (utile aux moteurs de recherche). */
const notFoundWhenNull = () => {
  const response = inject(RESPONSE_INIT, { optional: true });
  return <T>(found: T | null) => {
    if (!found && response) {
      response.status = 404;
    }
  };
};

/** Libellés SEO de la langue active, fixée par `useLocale` avant l'exécution des résolveurs. */
const seoContent = () => inject(LanguageService).content().seo;

/* --- Fiche candidat : les trois résolveurs partagent une seule requête (voir CandidatesApi.bySlug). --- */

const candidate: ResolveFn<Candidate | null> = (route) => {
  const markNotFound = notFoundWhenNull();
  return inject(CandidatesApi)
    .bySlug(route.paramMap.get('slug')!)
    .pipe(tap((c) => markNotFound(c)));
};

/** Titre d'onglet dynamique : le nom du candidat. */
const candidateTitle: ResolveFn<string> = (route) => {
  const seo = seoContent();
  return inject(CandidatesApi)
    .bySlug(route.paramMap.get('slug')!)
    .pipe(map((c) => (c?.name ?? seo.candidateNotFound) + seo.titleSuffix));
};

/** Description SEO dynamique, lue par SeoService via `data.seo`. */
const candidateSeo: ResolveFn<RouteSeo> = (route) =>
  inject(CandidatesApi)
    .bySlug(route.paramMap.get('slug')!)
    .pipe(
      map((c) => ({
        description: c
          ? [c.name, c.subtitle, c.bio[0]].filter(Boolean).join(' — ')
          : undefined,
      })),
    );

/* --- Article du blog --- */

const post: ResolveFn<Post | null> = (route) => {
  const markNotFound = notFoundWhenNull();
  return inject(BlogApi)
    .bySlug(route.paramMap.get('slug')!)
    .pipe(tap((p) => markNotFound(p)));
};

const postTitle: ResolveFn<string> = (route) => {
  const seo = seoContent();
  return inject(BlogApi)
    .bySlug(route.paramMap.get('slug')!)
    .pipe(map((p) => (p?.title ?? seo.postNotFound) + seo.titleSuffix));
};

const postSeo: ResolveFn<RouteSeo> = (route) =>
  inject(BlogApi)
    .bySlug(route.paramMap.get('slug')!)
    .pipe(map((p) => ({ description: p?.excerpt, image: p?.cover ?? undefined })));

/* --- Site public, décliné par langue --- */

/** Fixe la langue du site avant le rendu (et avant les résolveurs des pages). */
const useLocale =
  (locale: Locale): CanActivateFn =>
  () => {
    inject(LanguageService).setLanguage(locale);
    return true;
  };

/** Pages du site public, avec les titres et descriptions de la langue demandée. */
function publicRoutes(locale: Locale): Routes {
  const seo = CATALOG[locale].seo;

  /** Page éditoriale : titre d'onglet et description tirés du contenu de la langue. */
  const page = (key: SeoPage, route: Route): Route => ({
    ...route,
    title: key === 'home' ? seo.pages[key].title : seo.pages[key].title + seo.titleSuffix,
    data: { seo: { description: seo.pages[key].description } },
  });

  return [
    page('home', { path: '', loadComponent: () => import('./pages/home/home') }),
    page('about', { path: 'a-propos', loadComponent: () => import('./pages/a-propos/a-propos') }),
    page('vision', { path: 'vision', loadComponent: () => import('./pages/vision/vision') }),
    page('program', { path: 'programme', loadComponent: () => import('./pages/programme/programme') }),
    page('org', { path: 'organigramme', loadComponent: () => import('./pages/organigramme/organigramme') }),
    page('candidates', { path: 'candidats', loadComponent: () => import('./pages/candidats/candidats') }),
    {
      path: 'candidats/:slug',
      title: candidateTitle,
      loadComponent: () => import('./pages/candidat/candidat'),
      resolve: { candidate, seo: candidateSeo },
    },
    page('news', { path: 'actualites', loadComponent: () => import('./pages/actualites/actualites') }),
    {
      path: 'actualites/:slug',
      title: postTitle,
      loadComponent: () => import('./pages/article/article'),
      resolve: { post, seo: postSeo },
    },
    page('events', { path: 'evenements', loadComponent: () => import('./pages/evenements/evenements') }),
    page('press', { path: 'presse', loadComponent: () => import('./pages/presse/presse') }),
    page('gallery', { path: 'galerie', loadComponent: () => import('./pages/galerie/galerie') }),
    page('join', {
      path: 'devenir-membre',
      loadComponent: () => import('./pages/devenir-membre/devenir-membre'),
    }),
    page('donate', { path: 'faire-un-don', loadComponent: () => import('./pages/faire-un-don/faire-un-don') }),
    page('contact', { path: 'contact', loadComponent: () => import('./pages/contact/contact') }),
    page('notFound', { path: '**', loadComponent: () => import('./pages/not-found/not-found') }),
  ];
}

/** Habillage commun (en-tête + pied de page) autour des pages d'une langue. */
const localizedSite = (locale: Locale): Route => ({
  path: LOCALE_PREFIX[locale],
  component: PublicLayout,
  canActivate: [useLocale(locale)],
  children: publicRoutes(locale),
});

export const routes: Routes = [
  {
    // Déclaré avant le site public, dont la route `**` intercepterait sinon `/admin`.
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes'),
  },
  // `/en/...` avant le français, servi à la racine, dont la route `**` capterait tout.
  localizedSite('en'),
  localizedSite('fr'),
];
