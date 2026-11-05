/* ScentKart app: installable, opens fast, works offline for the main page */
const C="sk-v1";
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(["/"])).catch(()=>{}));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request,u=new URL(r.url);if(r.method!=="GET"||u.origin!==location.origin)return;
  if(r.mode==="navigate"){e.respondWith(fetch(r).then(res=>{caches.open(C).then(c=>c.put("/",res.clone()));return res}).catch(()=>caches.match("/")));return}
  e.respondWith(caches.match(r).then(m=>m||fetch(r)))});
