self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // 保持版本測試容易：不快取 HTML，只做正常網路請求。
  if (event.request.method === 'GET' && url.origin === self.location.origin) {
    event.respondWith(fetch(event.request));
  }
});
