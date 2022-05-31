import { build, timestamp, files } from "$service-worker";

const cacheName = `tournament-app-cache-v${timestamp}`;
const offlinePage = "/offline.html";

self.addEventListener("install", (e) => {
    e.waitUntil(
        (async () => {
            const cache = await caches.open(cacheName);
            await cache.addAll(build);
            await cache.addAll(files);
        })()
    );
    self.skipWaiting();
});

self.addEventListener("activate", (e) => {
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(
                keyList.map((key) => {
                    if (key === cacheName) {
                        return;
                    }
                    return caches.delete(key);
                })
            );
        })
    );
    self.clients.claim();
});

self.addEventListener("fetch", (e) => {
    e.respondWith(
        (async () => {
            const r = await caches.match(e.request);
            if (r) {
                return r;
            }

            try {
                const response = await fetch(e.request);
                return response;
            } catch (error) {
                // likely a network error due to offline
                console.log(`Fetch failed; returning ${offlinePage}`);
                const cache = await caches.open(cacheName);
                const r = await cache.match(offlinePage);
                return r;
            }
        })()
    );
});
