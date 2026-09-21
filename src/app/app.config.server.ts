import { mergeApplicationConfig, ApplicationConfig, REQUEST, inject } from '@angular/core';
import { HTTP_TRANSFER_CACHE_ORIGIN_MAP } from '@angular/common/http';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { API_BASE_URL } from './config/api';

/** API Spring, jointe directement par le rendu serveur (réseau interne en production). */
const apiUrl = (process.env['API_URL'] ?? 'http://localhost:8081').replace(/\/+$/, '');

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    { provide: API_BASE_URL, useValue: apiUrl },
    {
      // Le serveur appelle `API_URL`, le navigateur l'origine du site : on aligne les clés du cache
      // de transfert pour que le navigateur réutilise les réponses obtenues pendant le rendu.
      provide: HTTP_TRANSFER_CACHE_ORIGIN_MAP,
      useFactory: () => {
        const request = inject(REQUEST, { optional: true });
        return request ? { [new URL(apiUrl).origin]: new URL(request.url).origin } : {};
      },
    },
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
