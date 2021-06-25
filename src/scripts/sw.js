const { assets } = global.serviceWorkerOption;
import CacheHelper from "./utils/cache-helper";
import "regenerator-runtime";

self.addEventListener("install", (event) => {
  console.log("Installing Service Worker ...");

  event.waitUntil(CacheHelper.cachingAppShell([...assets, "./"]));
});

self.addEventListener("activate", (event) => {
  console.log("Activating Service Worker ...");

  event.waitUntil(CacheHelper.deleteOldCache());
});

self.addEventListener("fetch", (event) => {
  console.log(event.request);

  event.respondWith(CacheHelper.revalidateCache(event.request));
});
