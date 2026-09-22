import { RESPONSE_INIT, inject } from '@angular/core';
import { ResolveFn, Routes } from '@angular/router';
import { map, tap } from 'rxjs';
import { RouteSeo } from './services/seo.service';
import { CandidatesApi } from './services/candidates-api.service';
import { BlogApi } from './services/blog-api.service';
import { Candidate } from './models/content.model';
import { Post } from './models/blog.model';
import { PublicLayout } from './layouts/public-layout';

const SUFFIX = ' — DEBOUT PATRIOTES';

/** Page introuvable : renvoie un vrai 404 au rendu serveur (utile aux moteurs de recherche). */
const notFoundWhenNull = () => {
  const response = inject(RESPONSE_INIT, { optional: true });
  return <T>(found: T | null) => {
    if (!found && response) {
      response.status = 404;
    }
  };
};

/* --- Fiche candidat : les trois résolveurs partagent une seule requête (voir CandidatesApi.bySlug). --- */

const candidate: ResolveFn<Candidate | null> = (route) => {
  const markNotFound = notFoundWhenNull();
  return inject(CandidatesApi)
    .bySlug(route.paramMap.get('slug')!)
    .pipe(tap((c) => markNotFound(c)));
};

/** Titre d'onglet dynamique : le nom du candidat. */
const candidateTitle: ResolveFn<string> = (route) =>
  inject(CandidatesApi)
    .bySlug(route.paramMap.get('slug')!)
    .pipe(map((c) => (c?.name ?? 'Candidat introuvable') + SUFFIX));

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

const postTitle: ResolveFn<string> = (route) =>
  inject(BlogApi)
    .bySlug(route.paramMap.get('slug')!)
    .pipe(map((p) => (p?.title ?? 'Article introuvable') + SUFFIX));

const postSeo: ResolveFn<RouteSeo> = (route) =>
  inject(BlogApi)
    .bySlug(route.paramMap.get('slug')!)
    .pipe(map((p) => ({ description: p?.excerpt, image: p?.cover ?? undefined })));

/** Pages du site public, affichées dans l'habillage commun (en-tête + pied de page). */
const publicRoutes: Routes = [
  {
    path: '',
    title: 'DEBOUT PATRIOTES — Debout pour Haïti, patriotes pour la Nation',
    loadComponent: () => import('./pages/home/home'),
    data: {
      seo: {
        description:
          "Onze partis politiques émergents rassemblés autour d'une même vision : refonder l'État, reconstruire le pays et garantir de meilleures conditions de vie à la population haïtienne.",
      },
    },
  },
  {
    path: 'a-propos',
    title: 'À propos' + SUFFIX,
    loadComponent: () => import('./pages/a-propos/a-propos'),
    data: {
      seo: {
        description:
          "Constitué en août 2026 à l'occasion de l'inscription au CEP, DEBOUT PATRIOTES rassemble onze partis politiques émergents à un carrefour décisif de l'histoire d'Haïti.",
      },
    },
  },
  {
    path: 'vision',
    title: 'Notre vision' + SUFFIX,
    loadComponent: () => import('./pages/vision/vision'),
    data: {
      seo: {
        description:
          "Remettre Haïti sur le chemin de la sécurité, de la souveraineté, de la légitimité démocratique et du progrès : la vision de DEBOUT PATRIOTES.",
      },
    },
  },
  {
    path: 'programme',
    title: 'Notre programme' + SUFFIX,
    loadComponent: () => import('./pages/programme/programme'),
    data: {
      seo: {
        description:
          'Les sept axes de gouvernance arrêtés par les onze partis membres de DEBOUT PATRIOTES, soumis au débat public avant les élections générales.',
      },
    },
  },
  {
    path: 'organigramme',
    title: 'Organigramme' + SUFFIX,
    loadComponent: () => import('./pages/organigramme/organigramme'),
    data: {
      seo: {
        description:
          "Assemblée des partis membres, Coordination générale, secrétariats, commissions thématiques et coordinations départementales : l'organisation de DEBOUT PATRIOTES.",
      },
    },
  },
  {
    path: 'candidats',
    title: 'Nos candidats' + SUFFIX,
    loadComponent: () => import('./pages/candidats/candidats'),
    data: {
      seo: {
        description:
          'Les femmes et les hommes qui portent les couleurs de DEBOUT PATRIOTES aux prochaines élections générales.',
      },
    },
  },
  {
    path: 'candidats/:slug',
    title: candidateTitle,
    loadComponent: () => import('./pages/candidat/candidat'),
    resolve: { candidate, seo: candidateSeo },
  },
  {
    path: 'actualites',
    title: 'Actualités' + SUFFIX,
    loadComponent: () => import('./pages/actualites/actualites'),
    data: {
      seo: {
        description:
          'Prises de position, activités de terrain et vie des onze partis membres de DEBOUT PATRIOTES.',
      },
    },
  },
  {
    path: 'actualites/:slug',
    title: postTitle,
    loadComponent: () => import('./pages/article/article'),
    resolve: { post, seo: postSeo },
  },
  {
    path: 'evenements',
    title: 'Événements' + SUFFIX,
    loadComponent: () => import('./pages/evenements/evenements'),
    data: {
      seo: {
        description:
          'Assemblées, rencontres départementales, conférences de presse et mobilisations de DEBOUT PATRIOTES.',
      },
    },
  },
  {
    path: 'presse',
    title: 'Espace presse' + SUFFIX,
    loadComponent: () => import('./pages/presse/presse'),
    data: {
      seo: {
        description:
          'Communiqués officiels, notes de position et contact presse de DEBOUT PATRIOTES.',
      },
    },
  },
  {
    path: 'galerie',
    title: 'Galerie' + SUFFIX,
    loadComponent: () => import('./pages/galerie/galerie'),
    data: {
      seo: {
        description:
          'Images des assemblées, des rencontres de terrain et de la vie du groupement DEBOUT PATRIOTES.',
      },
    },
  },
  {
    path: 'devenir-membre',
    title: 'Devenir membre' + SUFFIX,
    loadComponent: () => import('./pages/devenir-membre/devenir-membre'),
    data: {
      seo: {
        description:
          'Militant, sympathisant, contributeur technique, jeune ou membre de la diaspora : rejoignez DEBOUT PATRIOTES.',
      },
    },
  },
  {
    path: 'faire-un-don',
    title: 'Soutenir le groupement' + SUFFIX,
    loadComponent: () => import('./pages/faire-un-don/faire-un-don'),
    data: {
      seo: {
        description:
          'Une politique indépendante a besoin de moyens indépendants. Soutenez le travail de DEBOUT PATRIOTES.',
      },
    },
  },
  {
    path: 'contact',
    title: 'Nous contacter' + SUFFIX,
    loadComponent: () => import('./pages/contact/contact'),
    data: {
      seo: {
        description:
          'Une question, une proposition, une critique ou une demande presse : écrivez à DEBOUT PATRIOTES.',
      },
    },
  },
  {
    path: '**',
    title: 'Page introuvable' + SUFFIX,
    loadComponent: () => import('./pages/not-found/not-found'),
  },
];

export const routes: Routes = [
  {
    // Déclaré avant le site public, dont la route `**` intercepterait sinon `/admin`.
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes'),
  },
  { path: '', component: PublicLayout, children: publicRoutes },
];
