const CORE_CACHE = 1;
const CORE_CACHE_NAME = `core-v${CORE_CACHE}`;
const CORE_ASSETS = [
  'manifest.json',
  '/offline',
  '/account',
  '/scanner',
  'css/main.css',
  'js/main.js',
];

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

  event.respondWith(
    fetch(req)
      .then((fetchRes) => {
        return caches.open(CORE_CACHE_NAME).then((cache) => {
          cache.put(req, fetchRes.clone());
          return fetchRes;
        });
      })
      .catch((err) => {
        return caches.match(req).then((cachedRes) => {
          if (cachedRes) {
            return cachedRes;
          } else {
            return caches
              .open(CORE_CACHE_NAME)
              .then((cache) => cache.match('/offline'));
          }
        });
      }),
  );
});
