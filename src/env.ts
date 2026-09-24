/**
 * Variables d'environnement du serveur : rendu SSR, relais `/api` et proxy de `ng serve`.
 *
 * Le fichier `.env` de la racine est chargé au démarrage s'il existe (voir `.env.example`).
 * `process.loadEnvFile()` n'écrase jamais une variable déjà définie : ce qui vient de
 * l'hébergeur ou du shell l'emporte toujours sur le fichier, qui ne sert donc qu'en local.
 *
 * Rien de tout ceci n'atteint le navigateur : ce module n'est importé que par du code serveur.
 */

try {
  process.loadEnvFile();
} catch {
  // Pas de `.env` : en production les variables viennent de l'hébergeur (voir `render.yaml`).
}

/**
 * API Spring (blog, candidats, back-office), sans barre oblique finale.
 *
 * Jointe directement par le rendu serveur, et par le relais `/api` de `src/server.ts` — le
 * navigateur, lui, n'appelle que l'origine du site.
 */
export const API_URL = (process.env['API_URL'] ?? 'http://localhost:8081').replace(/\/+$/, '');
