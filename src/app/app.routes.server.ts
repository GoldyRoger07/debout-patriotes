import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Pages alimentées par l'API : rendues à chaque requête pour refléter immédiatement
  // les modifications faites dans le back-office.
  { path: '', renderMode: RenderMode.Server },
  { path: 'candidats', renderMode: RenderMode.Server },
  { path: 'candidats/:slug', renderMode: RenderMode.Server },
  { path: 'actualites', renderMode: RenderMode.Server },
  { path: 'actualites/:slug', renderMode: RenderMode.Server },
  { path: 'evenements', renderMode: RenderMode.Server },
  { path: 'galerie', renderMode: RenderMode.Server },
  { path: 'galerie/:slug', renderMode: RenderMode.Server },
  // Mêmes pages, version anglaise.
  { path: 'en', renderMode: RenderMode.Server },
  { path: 'en/candidats', renderMode: RenderMode.Server },
  { path: 'en/candidats/:slug', renderMode: RenderMode.Server },
  { path: 'en/actualites', renderMode: RenderMode.Server },
  { path: 'en/actualites/:slug', renderMode: RenderMode.Server },
  { path: 'en/evenements', renderMode: RenderMode.Server },
  { path: 'en/galerie', renderMode: RenderMode.Server },
  { path: 'en/galerie/:slug', renderMode: RenderMode.Server },
  // Back-office : application purement cliente (jeton stocké dans le navigateur, pas de SEO).
  { path: 'admin', renderMode: RenderMode.Client },
  { path: 'admin/**', renderMode: RenderMode.Client },
  // Pages éditoriales statiques : générées une fois au build.
  { path: '**', renderMode: RenderMode.Prerender },
];
