/* Retire the former offline app. Kept at its old URL so existing installs update. */
self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event => event.waitUntil((async () => {
  const keys = await caches.keys();
  await Promise.all(keys.filter(key => key.startsWith('anushka-shell-')).map(key => caches.delete(key)));
  await self.clients.claim();
  const windows = await self.clients.matchAll({type:'window', includeUncontrolled:true});
  await self.registration.unregister();
  await Promise.all(windows.filter(client => new URL(client.url).origin === self.location.origin).map(client => client.navigate(self.location.origin + '/').catch(() => {})));
})()));
