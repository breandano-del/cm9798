// Keeps the app (page + emulator) on the device so it plays with no connection.
// The game itself is never fetched: it lives in IndexedDB after you load your zip.
const CACHE = "cm9798-v4";
const FILES = [
  "./", "index.html", "manifest.webmanifest",
  "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png",
  "vendor/fflate.js",
  "vendor/emu/emulators.js", "vendor/emu/wdosbox.js", "vendor/emu/wdosbox.wasm",
  "vendor/emu/wlibzip.js", "vendor/emu/wlibzip.wasm",
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES.map(f => new Request(f, { cache: "reload" })))).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  // The page: network first (so an update shows on the next launch), cached copy offline.
  if (req.mode === "navigate") {
    e.respondWith(fetch(req, { cache: "no-cache" })
      .then(res => { if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put("index.html", copy)); } return res; })
      .catch(() => caches.match("index.html")));
    return;
  }
  // Everything else (emulator, icons): cache first. Bump CACHE to ship a new emulator.
  e.respondWith(caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req)));
});
