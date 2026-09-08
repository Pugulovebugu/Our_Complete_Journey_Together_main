// -------------------------------
// PWA CACHE SETTINGS
// -------------------------------

const CACHE_NAME = "ocjt-cache-v20260908";

const BASE = "/Our_Complete_Journey_Together_main";

const FILES_TO_CACHE = [
  `${BASE}/`,
  `${BASE}/index.html`,
  `${BASE}/style.css`,
  `${BASE}/script.js`,
  `${BASE}/firebase-notification.js`,
  `${BASE}/manifest.json`,
  `${BASE}/icon-192.png`,
  `${BASE}/icon-512.png`
];


// -------------------------------
// INSTALL EVENT
// -------------------------------

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );

  // Activate new service worker immediately
  self.skipWaiting();
});


// -------------------------------
// ACTIVATE EVENT
// -------------------------------

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );

  // Take control of all open pages immediately
  self.clients.claim();
});


// -------------------------------
// FETCH EVENT
// Network First + Offline Cache
// -------------------------------

self.addEventListener("fetch", event => {

  // Only handle GET requests
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    (async () => {

      const cache = await caches.open(CACHE_NAME);

      try {

        // Try network first
        const response = await fetch(event.request);

        // Cache successful responses
        if (response && response.ok) {
          cache.put(event.request, response.clone());
        }

        return response;

      } catch (error) {

        // If offline → use cached version
        const cached = await cache.match(event.request);

        if (cached) {
          return cached;
        }

        // If nothing is cached
        return Response.error();
      }

    })()
  );
});


// -------------------------------
// FIREBASE PUSH NOTIFICATIONS
// -------------------------------

importScripts(
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging.js"
);


// -------------------------------
// FIREBASE CONFIG
// -------------------------------

firebase.initializeApp({

  apiKey: "AIzaSyBNOw0v5SoDLs1a3Pku1klVhZIZZqqs0fo",

  authDomain:
    "our-complete-journey-together.firebaseapp.com",

  projectId:
    "our-complete-journey-together",

  messagingSenderId:
    "462695312802",

  appId:
    "1:462695312802:web:70076c81c14cf1e872d6fb"

});


// -------------------------------
// FIREBASE MESSAGING
// -------------------------------

const messaging = firebase.messaging();


// -------------------------------
// BACKGROUND NOTIFICATIONS
// -------------------------------

messaging.onBackgroundMessage(payload => {

  const notificationTitle =
    payload.notification?.title ||
    "Bugu ♥ Pugu";

  const notificationBody =
    payload.notification?.body ||
    "You have a new memory waiting for you 💗";

  self.registration.showNotification(
    notificationTitle,
    {
      body: notificationBody,

      icon:
        `${BASE}/icon-192.png`,

      badge:
        `${BASE}/icon-192.png`,

      data: {
        url:
          `${BASE}/index.html`
      }
    }
  );

});


// -------------------------------
// NOTIFICATION CLICK
// -------------------------------

self.addEventListener("notificationclick", event => {

  event.notification.close();

  const targetUrl =
    event.notification?.data?.url ||
    `${BASE}/index.html`;

  event.waitUntil(

    clients.matchAll({
      type: "window",
      includeUncontrolled: true
    }).then(clientList => {

      // If the website is already open,
      // focus it instead of opening another window.

      for (const client of clientList) {

        if (
          client.url.includes(
            "/Our_Complete_Journey_Together_main/"
          ) &&
          "focus" in client
        ) {
          return client.focus();
        }

      }

      // Otherwise open the website
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }

    })

  );

});
