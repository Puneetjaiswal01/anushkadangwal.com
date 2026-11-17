import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const output = path.resolve("dist");
async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const file = path.join(directory, entry.name);
      return entry.isDirectory() ? walk(file) : [file];
    }),
  );
  return nested.flat();
}
const files = (await walk(output))
  .map((file) => path.relative(output, file).split(path.sep).join("/"))
  .filter(
    (file) =>
      file === "index.html" ||
      file === "manifest.webmanifest" ||
      /^assets\/.*\.(?:js|css|woff2?|ttf|otf)$/.test(file) ||
      /^icons\/.*\.png$/.test(file) ||
      file === "audio/a-little-place-to-land.mp3",
  )
  .sort();
for (const required of [
  "index.html",
  "manifest.webmanifest",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/maskable-512.png",
  "audio/a-little-place-to-land.mp3",
]) {
  if (!files.includes(required))
    throw new Error(`PWA build is missing ${required}`);
}
const hash = createHash("sha256");
for (const file of files) {
  hash.update(file);
  hash.update(await readFile(path.join(output, file)));
}
const version = hash.digest("hex").slice(0, 16);
const urls = files.map((file) => "/" + file);
const worker = `/* Generated from this exact production build. No drafts or external requests are cached. */
const CACHE = ${JSON.stringify("anushka-shell-" + version)};
const PREFIX = "anushka-shell-";
const SHELL = ${JSON.stringify(urls, null, 2)};
const KNOWN_PATHS = new Set(SHELL);
self.addEventListener("install", event => {
  // addAll is transactional: a missing file prevents an incomplete shell from installing.
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(SHELL)));
});
self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith(PREFIX) && key !== CACHE).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});
async function audioRange(response, range) {
  const match = /^bytes=(\\d*)-(\\d*)$/.exec(range.trim());
  const bytes = await response.arrayBuffer();
  const size = bytes.byteLength;
  if (!match || (!match[1] && !match[2])) return new Response(null, { status: 416, headers: { "Content-Range": "bytes */" + size } });
  let start = match[1] ? Number(match[1]) : Math.max(0, size - Number(match[2]));
  let end = match[1] && match[2] ? Math.min(Number(match[2]), size - 1) : size - 1;
  if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start < 0 || start > end || start >= size) {
    return new Response(null, { status: 416, headers: { "Content-Range": "bytes */" + size } });
  }
  return new Response(bytes.slice(start, end + 1), { status: 206, headers: {
    "Content-Type": response.headers.get("Content-Type") || "audio/mpeg",
    "Accept-Ranges": "bytes", "Content-Range": "bytes " + start + "-" + end + "/" + size,
    "Content-Length": String(end - start + 1)
  } });
}
self.addEventListener("fetch", event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin) return;
  if (request.mode === "navigate") {
    event.respondWith((async () => {
      try {
        const response = await fetch(request);
        if (response.ok || response.status < 500) return response;
        return (await caches.match("/index.html", { cacheName: CACHE })) || response;
      } catch (error) {
        const shell = await caches.match("/index.html", { cacheName: CACHE });
        if (shell) return shell;
        throw error;
      }
    })());
    return;
  }
  if (!KNOWN_PATHS.has(url.pathname)) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const key = url.origin + url.pathname;
    const cached = await cache.match(key);
    if (cached) {
      if (request.headers.has("Range") && url.pathname.endsWith(".mp3")) return audioRange(cached, request.headers.get("Range"));
      return cached;
    }
    const response = await fetch(request);
    if (response.ok && response.status !== 206 && !request.headers.has("Range")) await cache.put(key, response.clone());
    return response;
  })());
});
`;
await writeFile(path.join(output, "sw.js"), worker);
console.log(
  `Built offline shell ${version}: ${urls.length} local files, including the original instrumental.`,
);
