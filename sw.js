/* RC Lap Time PWA V24 — do not cache application HTML or private Firestore data. */
const OFFLINE_CACHE='rc-lap-offline-v24';
const OFFLINE_URL='./offline.html';
const STATIC_ASSETS=[OFFLINE_URL, './rc-lap-192.png', './rc-lap-512.png', './rc-lap-maskable-512.png'];
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(OFFLINE_CACHE).then(cache=>cache.addAll(STATIC_ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('rc-lap-offline-')&&key!==OFFLINE_CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
  if(event.request.mode!=='navigate')return;
  event.respondWith(fetch(event.request).catch(async()=>{
    const cache=await caches.open(OFFLINE_CACHE);
    return (await cache.match(OFFLINE_URL))||Response.error();
  }));
});
