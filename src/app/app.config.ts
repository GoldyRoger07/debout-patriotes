import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { routes } from './app.routes';

// Dates au format français (« 18 septembre 2026 ») dans les pipes `date`.
registerLocaleData(localeFr);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      // Revenir en haut à chaque navigation, et honorer les ancres `#`.
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' }),
    ),
    // Les réponses GET obtenues pendant le rendu serveur sont transférées au navigateur lors de
    // l'hydratation : pas de second appel à l'API.
    provideHttpClient(withFetch()),
    provideClientHydration(),
    { provide: LOCALE_ID, useValue: 'fr' },
  ],
};
