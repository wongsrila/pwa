const staticCacheName = 'static-site';
const dynamicCacheName = 'dynamic-site';
const assets = [
  '/',
  '/icon/icon-192x192.png',
  '/icon/icon-256x256.png',
  '/icon/icon-384x384.png',
  '/icon/icon-512x512.png',
  '/css/main.css',
  'https://cdnjs.cloudflare.com/ajax/libs/html5-qrcode/2.3.4/html5-qrcode.min.js',
  '/js/scanner.js',
];

self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('caching static assets');
      cache.addAll(assets);
    }),
  );
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    caches
      .keys()
      .then((keyList) => {
        return Promise.all(
          keyList.map((key) => {
            if (key !== staticCacheName) {
              console.log('[ServiceWorker] Removing old cache', key);
              return caches.delete(key);
            }
          }),
        );
      })
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (evt) => {
  evt.respondWith(
    caches.match(evt.request).then((cacheRes) => {
      return fetch(evt.request) || cacheRes;
    }),
  );
});
