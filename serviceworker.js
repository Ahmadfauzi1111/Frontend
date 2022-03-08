const CACHE_NAME = 'My-site-cache-v1';
const toCache = [
    '/',
    '/css/style.css',
    '/js/register.js',
    '/gambar/majalengka.jpg',
    '/gambar/anchor-lee-kO1G3neRA2o-unsplash.jpg',
    '/gambar/bundaranmunjul.jpg',
    '/gambar/cikadongdong.jpg',
    '/gambar/curugibun.jpg',
    '/gambar/icon.jpg',
    '/gambar/majalengkakota.jpg',
    '/gambar/panyaweuyan.jpg',
    '/gambar/paralayang.jpg',
    '/gambar/prabu.jpg',
    '/contact.html',
    '/wisata.html'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            console.log('install service worker');
            return cache.addAll(toCache);
        })
    );
});

self.addEventListener('fetch', function(event){
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if(response){
                return response;
            }
            return fetch(event.request);
        }
        )
    );
});

self.addEventListener('activate', function(event){
    event.waitUntil(
        caches.keys().then(function(cacheNames){
            return Promise.all(
                cacheNames.filter(function(cacheNames){
                    return cacheName != CACHE_NAME
                }).map(function(cacheName){
                    return caches.delete(cacheName)
                })
            );
        })
    );
})

