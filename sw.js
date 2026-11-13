const CACHE = 'depenses-v2';
const RUNTIME = 'depenses-rt';
const FILES = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './parse.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './vendor/jszip.min.js',
  './vendor/pdf.min.mjs',
  './vendor/pdf.worker.min.mjs'
];
// Bibliothèque de lecture d'images (Tesseract.js) : mise en cache à la première utilisation.
const CDN = /(^|\.)(cdn\.jsdelivr\.net|tessdata\.projectnaptha\.com|unpkg\.com)$/;

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE && k !== RUNTIME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  if (url.origin !== self.location.origin) {
    if (!CDN.test(url.hostname)) return;
    e.respondWith(
      caches.open(RUNTIME).then(async (c) => {
        try {
          const res = await fetch(req);
          if (res && (res.ok || res.type === 'opaque')) c.put(req, res.clone());
          return res;
        } catch (err) {
          const hit = await c.match(req);
          if (hit) return hit;
          throw err;
        }
      })
    );
    return;
  }

  e.respondWith(
    caches.match(req).then((hit) => {
      if (hit) return hit;
      return fetch(req).catch(() => {
        if (req.mode === 'navigate') return caches.match('./index.html');
        return Response.error();
      });
    })
  );
});
