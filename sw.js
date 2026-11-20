const V="atlas-v2";
const FILES=["./","index.html","manifest.json","icon-192.png","icon-512.png","img/king.jpg","img/queen.jpg","img/jack.jpg",
 ...Array.from({length:15},(_,i)=>`img/p${String(i+1).padStart(2,"0")}.jpg`)];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)));self.skipWaiting();});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(V).then(c=>c.put(e.request,cp));return r;}).catch(()=>caches.match(e.request,{ignoreSearch:true})));
});
