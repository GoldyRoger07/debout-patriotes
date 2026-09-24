/**
 * Proxy de `ng serve` : relaie `/api` vers l'API Spring, comme le fait `src/server.ts` en
 * production. Le navigateur n'appelle donc que l'origine du site, en développement comme en ligne.
 *
 * La cible vient de `API_URL` (fichier `.env`, voir `.env.example`) : basculer entre l'API locale
 * et l'API déployée ne demande plus de modifier un fichier versionné.
 */

try {
  process.loadEnvFile();
} catch {
  // Pas de `.env` : on retombe sur l'API locale.
}

export default {
  '/api': {
    target: process.env['API_URL'] ?? 'https://debout-patriotes-api-production.up.railway.app',
    secure: false,
    changeOrigin: true,
  },
};
