const CACHE_NAME = 'pokebuilder-v2';
const APP_SHELL = [
  './',
  './index.html',
  './styles.css',
  './dex.js',
  './utils.js',
  './manifest.json',
  './icon.svg',
  './data/TC.js',
  './data/pokemon-core.js',
  './data/base_stats.js',
  './data/abilities.js',
  './data/sprites.js',
  './data/moves.js',
  './data/move-info.js',
  './data/bosses.js',
  './team/team-core.js',
  './team/team-io.js',
  './team/team-ai.js',
  './team/team-recommender.js',
  './team/team-analytics.js',
  './team/team-ui.js',
  './team/team-oop.js',
  './team/team-bosses.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200 || response.type !== 'basic') return response;
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        return response;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
