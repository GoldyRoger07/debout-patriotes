import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import { Readable } from 'node:stream';

const browserDistFolder = join(import.meta.dirname, '../browser');
// debout-patriotes-api-production.up.railway.app
/** API Spring (blog, candidats, back-office). */
const apiUrl = (process.env['API_URL'] ?? 'https://localhost:8081').replace(/\/+$/, '');

const app = express();
const angularApp = new AngularNodeAppEngine();

/** Sonde de santé de l'hébergeur : répond sans dépendre de l'API. */
app.get('/api/ping', (req, res) => {
  res.json({ message: 'pong' });
});

/**
 * En-têtes propres à une connexion, à ne pas relayer. `content-encoding`/`content-length` sont
 * retirés de la réponse car `fetch` a déjà décompressé le corps.
 */
const HOP_BY_HOP = new Set([
  'connection',
  'keep-alive',
  'transfer-encoding',
  'upgrade',
  'host',
  'content-length',
  'content-encoding',
  'proxy-authorization',
  'te',
  'trailer',
]);

/**
 * Relais `/api/*` → API Spring. Le navigateur n'appelle que l'origine du site : pas de CORS,
 * et l'API peut rester sur un réseau privé.
 */
app.use('/api', async (req, res) => {
  try {
    const headers = new Headers();
    for (const [name, value] of Object.entries(req.headers)) {
      if (value !== undefined && !HOP_BY_HOP.has(name)) {
        headers.set(name, Array.isArray(value) ? value.join(', ') : value);
      }
    }
    headers.set('x-forwarded-host', req.get('host') ?? '');
    headers.set('x-forwarded-proto', req.protocol);

    const hasBody = req.method !== 'GET' && req.method !== 'HEAD';
    const upstream = await fetch(apiUrl + req.originalUrl, {
      method: req.method,
      headers,
      body: hasBody ? (Readable.toWeb(req) as unknown as BodyInit) : undefined,
      redirect: 'manual',
      // Requis par Node pour envoyer un corps en flux.
      ...(hasBody ? { duplex: 'half' } : {}),
    } as RequestInit);

    res.status(upstream.status);
    upstream.headers.forEach((value, name) => {
      if (!HOP_BY_HOP.has(name)) {
        res.setHeader(name, value);
      }
    });
    if (upstream.body) {
      Readable.fromWeb(upstream.body as import('node:stream/web').ReadableStream).pipe(res);
    } else {
      res.end();
    }
  } catch (error) {
    console.error('API injoignable :', error);
    res.status(502).json({ detail: "L'API est momentanément indisponible." });
  }
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
