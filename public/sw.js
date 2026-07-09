const CACHE_NAME = 'tanveer-v2'; // Incremented version to force update
const ASSETS = [
  '/',
  '/profile.jpg',
  '/favicon.ico',
  '/resume.docx',
  '/manifest.webmanifest'
];

self.addEventListener('install', (event) => {
  // Skip waiting allows the new service worker to take control immediately
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('activate', (event) => {
  // Clean up old caches
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  // Take control of all pages immediately
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Network first strategy for index.html to prevent loading outdated hashed assets
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match('/');
      })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(() => {
        // Fallback or silent fail if fetch fails and not in cache
        console.error('Fetch failed for:', event.request.url);
      });
    })
  );
});
