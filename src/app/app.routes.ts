import { Routes } from '@angular/router';

const SUFFIX = ' — DEBOUT PATRIOTES';

export const routes: Routes = [
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
