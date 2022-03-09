const CACHE_NAME = 'My-site-cache-v1';
const toCache = [
    '/',
    '/css/style.css',
    '/js/register.js',
    '/gambar/anchor-lee-kO1G3neRA2o-unsplash.jpg',
    '/gambar/bars.png',
    '/gambar/bundaranmunjul.jpg',
    '/gambar/cikadongdong.jpg',
    '/gambar/close.png',
    '/gambar/curugibun.jpg',
    '/gambar/icon.jpg',
    '/gambar/icon-72x72.png',
    '/gambar/icon-96x96.png',
    '/gambar/icon-128x128.png',
    '/gambar/icon-144x144.png',
    '/gambar/icon-152x152.png',
    '/gambar/icon-192x192.png',
    '/gambar/icon-384x384.png',
    '/gambar/icon-512x512.png',
    '/gambar/majalengka.jpg',
    '/gambar/majalengkakota.jpg',
    '/gambar/panyaweuyan.jpg',
    '/gambar/paralayang.jpg',
    '/gambar/prabu.jpg',
    '/contact.html',
    '/wisata.html',
    '/index.html',
    '/manifest.json',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css',
    'https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800;900&display=swap'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            console.log('install service worker');
            return cache.addAll(toCache);
        }).then(self.skipWaiting())
    )
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
                cacheNames.filter(function(cacheName){
                    return cacheName != CACHE_NAME
                }).map(function(cacheName){
                    return caches.delete(cacheName)
                })
            );
        })
    );
})

