/* ==========================================================================
 * Web4 Universal Service Worker
 * Version: 1.0.0
 * ========================================================================== */

const VERSION = "1.0.0";
const CACHE_NAME = `web4-cache-${VERSION}`;

const STATIC_ASSETS = [
    "/",
    "/index.html",
    "/manifest.json",
    "/favicon.ico",

    "/css/app.css",
    "/css/theme.css",

    "/js/app.js",

    "/images/logo.png"
];

/* ==========================================================================
 * INSTALL
 * ========================================================================== */

self.addEventListener("install", event => {
    self.skipWaiting();

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(STATIC_ASSETS))
    );
});

/* ==========================================================================
 * ACTIVATE
 * ========================================================================== */

self.addEventListener("activate", event => {

    event.waitUntil(
        caches.keys()
            .then(keys =>
                Promise.all(
                    keys
                        .filter(key => key !== CACHE_NAME)
                        .map(key => caches.delete(key))
                )
            )
            .then(() => self.clients.claim())
    );

});

/* ==========================================================================
 * FETCH
 * Network First
 * ========================================================================== */

self.addEventListener("fetch", event => {

    if (event.request.method !== "GET") return;

    event.respondWith(

        fetch(event.request)

            .then(response => {

                const clone = response.clone();

                caches.open(CACHE_NAME)
                    .then(cache => cache.put(event.request, clone));

                return response;

            })

            .catch(() =>
                caches.match(event.request)
            )

    );

});

/* ==========================================================================
 * BACKGROUND SYNC
 * ========================================================================== */

self.addEventListener("sync", event => {

    if (event.tag === "sync-data") {

        event.waitUntil(syncData());

    }

});

async function syncData() {

    console.log("Background Sync Running");

    return Promise.resolve();

}

/* ==========================================================================
 * PUSH NOTIFICATIONS
 * ========================================================================== */

self.addEventListener("push", event => {

    let payload = {
        title: "Web4",
        body: "New notification",
        icon: "/favicon.ico",
        badge: "/favicon.ico"
    };

    if (event.data) {

        payload = event.data.json();

    }

    event.waitUntil(

        self.registration.showNotification(
            payload.title,
            {
                body: payload.body,
                icon: payload.icon,
                badge: payload.badge,
                data: payload.url
            }
        )

    );

});

/* ==========================================================================
 * NOTIFICATION CLICK
 * ========================================================================== */

self.addEventListener("notificationclick", event => {

    event.notification.close();

    event.waitUntil(

        clients.openWindow(
            event.notification.data || "/"
        )

    );

});

/* ==========================================================================
 * MESSAGE API
 * ========================================================================== */

self.addEventListener("message", event => {

    if (!event.data) return;

    switch (event.data.type) {

        case "SKIP_WAITING":
            self.skipWaiting();
            break;

        case "CLEAR_CACHE":
            caches.keys().then(keys => {
                keys.forEach(key => caches.delete(key));
            });
            break;

        default:
            console.log(event.data);

    }

});

/* ==========================================================================
 * PERIODIC BACKGROUND SYNC
 * ========================================================================== */

self.addEventListener("periodicsync", event => {

    if (event.tag === "refresh-content") {

        event.waitUntil(refreshContent());

    }

});

async function refreshContent() {

    console.log("Refreshing cached content");

}

/* ==========================================================================
 * SHARE TARGET
 * ========================================================================== */

self.addEventListener("fetch", event => {

    const url = new URL(event.request.url);

    if (
        event.request.method === "POST" &&
        url.pathname === "/share"
    ) {

        event.respondWith(Response.redirect("/"));

    }

});

/* ==========================================================================
 * CACHE UTILITIES
 * ========================================================================== */

async function clearOldCaches() {

    const keys = await caches.keys();

    await Promise.all(

        keys
            .filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))

    );

}

/* ==========================================================================
 * OFFLINE FALLBACK
 * ========================================================================== */

async function offlineFallback(request) {

    const cached = await caches.match(request);

    if (cached) return cached;

    return caches.match("/index.html");

}

/* ==========================================================================
 * END
 * ========================================================================== */
