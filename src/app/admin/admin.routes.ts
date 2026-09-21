import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { Routes } from '@angular/router';
import { AdminShell } from './layout/admin-shell';
import { AdminLayout } from './layout/admin-layout';
import { AdminApi } from './core/admin-api.service';
import { authGuard } from './core/auth.guard';
import { authInterceptor } from './core/auth.interceptor';

const SUFFIX = ' — Back-office DEBOUT PATRIOTES';

/** Back-office, chargé à la demande sous `/admin` et rendu uniquement dans le navigateur. */
export default [
  {
    path: '',
    component: AdminShell,
    // `HttpClient` propre au back-office : seul lui porte le jeton d'authentification.
    providers: [provideHttpClient(withFetch(), withInterceptors([authInterceptor])), AdminApi],
    children: [
      {
        path: 'connexion',
        title: 'Connexion' + SUFFIX,
        loadComponent: () => import('./pages/login'),
      },
      {
        path: '',
        component: AdminLayout,
        canActivate: [authGuard],
        children: [
          {
            path: '',
            title: 'Tableau de bord' + SUFFIX,
            loadComponent: () => import('./pages/dashboard'),
          },
          {
            path: 'articles',
            title: 'Articles' + SUFFIX,
            loadComponent: () => import('./pages/posts-list'),
          },
          {
            path: 'articles/nouveau',
            title: 'Nouvel article' + SUFFIX,
            loadComponent: () => import('./pages/post-form'),
          },
          {
            path: 'articles/:id',
            title: 'Modifier un article' + SUFFIX,
            loadComponent: () => import('./pages/post-form'),
          },
          {
            path: 'rubriques',
            title: 'Rubriques' + SUFFIX,
            loadComponent: () => import('./pages/categories'),
          },
          {
            path: 'candidats',
            title: 'Candidats' + SUFFIX,
            loadComponent: () => import('./pages/candidates-list'),
          },
          {
            path: 'candidats/nouveau',
            title: 'Nouveau candidat' + SUFFIX,
            loadComponent: () => import('./pages/candidate-form'),
          },
          {
            path: 'candidats/:id',
            title: 'Modifier un candidat' + SUFFIX,
            loadComponent: () => import('./pages/candidate-form'),
          },
          {
            path: 'medias',
            title: 'Médiathèque' + SUFFIX,
            loadComponent: () => import('./pages/media'),
          },
          {
            path: 'compte',
            title: 'Mon compte' + SUFFIX,
            loadComponent: () => import('./pages/account'),
          },
          { path: '**', redirectTo: '' },
        ],
      },
    ],
  },
] satisfies Routes;
