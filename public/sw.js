let cacheData = "appV1";

this.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(cacheData).then((res) => {
      res.addAll([
        "/static/js/bundle.js",
        "/index.html",
        "/",
        "/static/media/StreamHaven.083a3ee32e2104da75f3.webp",
        "/favicon.ico",
        "/static/media/StreamHaven%20Cover.80fa9cc700b39c0de4b8.webp",
      ]);
    })
  );
});

this.addEventListener("fetch", (e) => {
  if (!navigator.onLine) {
    e.respondWith(
      caches.match(e.request).then((res) => {
        if (res) {
          return res;
        }
      })
    );
  }
});
