const CACHE_NAME = 'v0.1.0';
const CACHEABLE_RESOURCES = ["/", "index.html", "app.js", "manifest.json", "icon512.png", "/pkg/tiles_wa.js", "/pkg/tiles_wa_bg.wasm"];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    await caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(CACHEABLE_RESOURCES));
  }),
    self.skipWaiting()
  )
});

self.addEventListener("activate", (event) => {
  const cacheAllowlist = [CACHE_NAME];

  event.waitUntil(
    
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheAllowlist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        }),  
      );
    }),
    self.clients.claim()
  );
});

self.addEventListener('fetch', event => {
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);

    const cachedResponse = await cache.match(event.request);

    if (cachedResponse) {
      return cachedResponse;
    } else {
      try {
        
        const fetchResponse = await fetch(event.request);

        cache.put(event.request, fetchResponse.clone());
        return fetchResponse;
      } catch (e) {
        return await console.log(e);
        // 
      }
    }
  })());
});



