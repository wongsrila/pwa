const CORE_CACHE = 2;
const CORE_CACHE_NAME = `core-v${CORE_CACHE}`;
const CORE_ASSETS = ['manifest.json', '/offline', 'css/main.css'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CORE_CACHE_NAME).then((cache) => {
      console.log('caching static assets');
      cache.addAll(CORE_ASSETS);
    }),
  );
});

self.addEventListener('activate', (event) => {
  console.log('Activated');
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  console.log('Fetching:' + req.url);

  // show cached request from cache
  event.respondWith(
    caches.match(req).then((cachedRes) => {
      if (cachedRes) {
        return cachedRes;
      }
      return fetch(req)
        .then((fetchRes) => fetchRes)
        .catch((err) => {
          return caches
            .open(CORE_CACHE_NAME)
            .then((cache) => cache.match('/offline'));
        });
    }),
  );
});

// const staticCacheName = 'static-site';
// const dynamicCacheName = 'dynamic-site';
// const assets = [
//   '/',
//   '/icon/icon-192x192.png',
//   '/icon/icon-256x256.png',
//   '/icon/icon-384x384.png',
//   '/icon/icon-512x512.png',
//   '/css/main.css',
//   'https://cdnjs.cloudflare.com/ajax/libs/html5-qrcode/2.3.4/html5-qrcode.min.js',
//   '/js/scanner.js',
// ];

// self.addEventListener('install', (evt) => {
//   evt.waitUntil(
//     caches.open(staticCacheName).then((cache) => {
//       console.log('caching static assets');
//       cache.addAll(assets);
//     }),
//   );
// });

// self.addEventListener('activate', (evt) => {
//   evt.waitUntil(
//     caches
//       .keys()
//       .then((keyList) => {
//         return Promise.all(
//           keyList.map((key) => {
//             if (key !== staticCacheName) {
//               console.log('[ServiceWorker] Removing old cache', key);
//               return caches.delete(key);
//             }
//           }),
//         );
//       })
//       .then(() => self.clients.claim()),
//   );
// });

// self.addEventListener('fetch', (evt) => {
//   evt.respondWith(
//     caches.match(evt.request).then((cacheRes) => {
//       return fetch(evt.request) || cacheRes;
//     }),
//   );
// });
