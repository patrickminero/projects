const staticCacheName = 'site-static-v1';
const assets = [
    '/',
    'index.html',
    'scripts/app.js',
    'scripts/weather.js',
    'weather.css',
    'manifest.json',
    'media/icons/icon144.png',
    'media/icons/icon72.png',
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.5.1/gsap.min.js',
    'media/clear-day.svg',
    'media/clear-night.svg',
    'media/cloud-day.svg',
    'media/cloud-night.svg',
    'media/rain.svg',
    'media/snow.svg',
    'media/thunderstorm.svg',
    'https://api.openweathermap.org/data/2.5/onecall?lat=41.3797912&lon=2.1554772&appid=bb8fffb77c233d3391006cd4611ceda9&units=imperial',
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