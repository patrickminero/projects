const staticCacheName = 'site-static-v1';
const assets = [
    '/',
    'index.html',
    'scripts/app.js',
    'scripts/vue.js',
    'styles/style.css',
    'media/medal.svg',
    'https://kit.fontawesome.com/8631d0c616.js',
    'https://cdn.jsdelivr.net/npm/vue/dist/vue.js',
    'manifest.json',
    'https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap',
    'https://fonts.gstatic.com/s/robotocondensed/v19/ieVl2ZhZI2eCN5jzbjEETS9weq8-19K7DQk6YvM.woff2',
    'media/icons/icon_144.png',
    'https://kit-free.fontawesome.com/releases/latest/css/free.min.css',
    'https://kit-free.fontawesome.com/releases/latest/css/free-v4-shims.min.css',
    'https://kit-free.fontawesome.com/releases/latest/css/free-v4-font-face.min.css',
    'https://kit-free.fontawesome.com/releases/latest/webfonts/free-fa-solid-900.woff2',
    'https://kit-free.fontawesome.com/releases/latest/webfonts/free-fa-regular-400.woff2',
];

self.addEventListener('install', evt => {
    evt.waitUntil(
        caches.open(staticCacheName).then(cache => {
            // console.log('caching shell assets');
            cache.addAll(assets);
        })
    );
});

//activate event

self.addEventListener('activate', evt => {
    // console.log('service worker has been activated');
    evt.waitUntil(
        caches.keys().then(keys => {
            // console.log(keys);
            return Promise.all(keys
                .filter(key => key !== staticCacheName)
                .map(key => caches.delete(key)) 
            )
        })
    );
});

self.addEventListener('fetch', evt =>{
    // console.log('fetch event', evt);
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request);
        })
    )
});