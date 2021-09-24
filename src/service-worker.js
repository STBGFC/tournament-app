import { build, timestamp, files } from "$service-worker";

const applicationCacheName = `applicationCache-v${timestamp}`;
const staticCacheName = `staticCache-v${timestamp}`;

// Caches the svelte app (not the data)
self.addEventListener("install", (event) => {
    event.waitUntil((async () => {
        const applicationCache = await caches.open(applicationCacheName);
        await applicationCache.addAll(build);
        const staticCache = await caches.open(staticCacheName);
        await staticCache.addAll(files);
    })());
});

// Removes old caches
self.addEventListener("activate", (event) => {
    event.waitUntil((async () => {
        const keys = await caches.keys();
        keys
            .filter( key => key !== applicationCacheName && key !== staticCacheName )
            .map( key => caches.delete(key) );
    })());
});

// When there's an incoming fetch request, try and respond with a precached resource, otherwise fall back to the network
self.addEventListener('fetch', (event) => {
    console.log('Fetch intercepted for:', event.request.url);
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request);
        }),
    );
});
