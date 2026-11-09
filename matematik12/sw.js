// All app modules are cached atomically as one version. Research and plan files are excluded.
const CACHE='matematik14-primary-ab07393bacc4';
const FILES=[
  "./",
  "./index.html",
  "./styles.css",
  "./manifest.webmanifest",
  "./icon.svg",
  "./js/app.js",
  "./js/content/arithmetic.js",
  "./js/content/builders.js",
  "./js/content/catalog.js",
  "./js/content/definitions.js",
  "./js/content/example-detail.js",
  "./js/content/geometry-data.js",
  "./js/content/measurement.js",
  "./js/content/practice-bank.js",
  "./js/content/schema.js",
  "./js/curriculum.js",
  "./js/learning-progress.js",
  "./js/learning-session.js",
  "./js/progress.js",
  "./js/questions/answers.js",
  "./js/session.js",
  "./js/views/dom.js",
  "./js/views/lesson-view.js",
  "./js/views/practice-view.js",
  "./js/views/visual-data.js",
  "./js/views/visuals.js"
];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('matematik14-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
 event.respondWith(caches.open(CACHE).then(async cache=>{
  const cached=await cache.match(event.request,{ignoreSearch:true});if(cached)return cached;
  if(event.request.mode==='navigate')return cache.match('./index.html');
  try{return await fetch(event.request);}catch{return new Response('Bu içerik çevrimdışı kullanılamıyor. İnternete bağlanıp yeniden açın.',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}});}
 }));
});
