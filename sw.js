// Keeps the app (page + emulator) on the device so it plays with no connection.
// The game itself is never fetched: it lives in IndexedDB after you load your zip.
const CACHE = "cm9798-v1";
const FILES = [
  "./", "index.html", "manifest.webmanifest",
  "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png",
  "vendor/fflate.js",
  "vendor/emu/emulators.js", "vendor/emu/wdosbox.js", "vendor/emu/wdosbox.wasm",
  "vendor/emu/wlibzip.js", "vendor/emu/wlibzip.wasm",
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// Cache first, so it starts instantly and works offline. Bump CACHE to ship an update.
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(hit => hit || fetch(e.request)));
});
