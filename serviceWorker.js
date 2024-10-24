self.addEventListener('install', (e) => {  
    e.waitUntil(  
        caches.open('캐시이름')  
            .then(cache => {  
                cache.add('apt.jpeg');  
                cache.add('index.html');  
            })
    )  
})  
  
self.addEventListener('active', () => console.log('엑티브'))  
  
self.addEventListener('fetch', (e) => {  
    const resPromise = e.respondWith(caches.match(e.request))  
    if (resPromise) {  
        resPromise.then(res => {  
            // 3-1. 캐시에 값이 없다면  
            if (!res) {  
                // 3-2. 네트워크에 리소스를 요청  
                return fetch(e.request)  
            }  
  
            // 3-0. 캐시에서 응답  
            return res  
        })  
        .cache(console.error)  
    }  
})