/* Katuvisa Kauniainen — service worker.
   Verkko ensin, välimuisti varalle. Uusi GitHubiin viety versio tulee siis
   käyttöön heti seuraavalla avauksella, ja peli toimii silti offline. */

const CACHE = 'grani-katuvisa-v1';

const CORE = [
  './',
  './index.html',
  './Katuvisa.dc.html',
  './support.js',
  './map-data.js',
  './street-facts.js',
  './sv-facts.js',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable.png',
  './apple-touch-icon.png'
];

// Claude Designin ajonaikainen kirjasto hakee Reactin tästä osoitteesta.
const EXTRA_ORIGINS = ['unpkg.com', 'fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(CORE))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  if (!sameOrigin && EXTRA_ORIGINS.indexOf(url.hostname) === -1) return;

  event.respondWith(
    fetch(req)
      .then(res => {
        if (res && (res.ok || res.type === 'opaque')) {
          const copy = res.clone();
          caches.open(CACHE).then(cache => cache.put(req, copy)).catch(() => {});
        }
        return res;
      })
      .catch(() =>
        caches.match(req).then(hit => {
          if (hit) return hit;
          if (req.mode === 'navigate') return caches.match('./index.html');
          return Response.error();
        })
      )
  );
});
