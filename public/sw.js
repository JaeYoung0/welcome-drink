if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let i=Promise.resolve();return s[e]||(i=new Promise((async i=>{if("document"in self){const s=document.createElement("script");s.src=e,document.head.appendChild(s),s.onload=i}else importScripts(e),i()}))),i.then((()=>{if(!s[e])throw new Error(`Module ${e} didn’t register its module`);return s[e]}))},i=(i,s)=>{Promise.all(i.map(e)).then((e=>s(1===e.length?e[0]:e)))},s={require:Promise.resolve(i)};self.define=(i,n,r)=>{s[i]||(s[i]=Promise.resolve().then((()=>{let s={};const a={uri:location.origin+i.slice(1)};return Promise.all(n.map((i=>{switch(i){case"exports":return s;case"module":return a;default:return e(i)}}))).then((e=>{const i=r(...e);return s.default||(s.default=i),s}))})))}}define("./sw.js",["./workbox-ea903bce"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/MiMyzd8W_miLiPvZeqcFm/_buildManifest.js",revision:"MiMyzd8W_miLiPvZeqcFm"},{url:"/_next/static/MiMyzd8W_miLiPvZeqcFm/_ssgManifest.js",revision:"MiMyzd8W_miLiPvZeqcFm"},{url:"/_next/static/chunks/106-b5a211dbe0fb571f71ae.js",revision:"MiMyzd8W_miLiPvZeqcFm"},{url:"/_next/static/chunks/76-7409fc7f2fcba8f9424b.js",revision:"MiMyzd8W_miLiPvZeqcFm"},{url:"/_next/static/chunks/framework-2191d16384373197bc0a.js",revision:"MiMyzd8W_miLiPvZeqcFm"},{url:"/_next/static/chunks/main-986f12b8cad460f5bdf7.js",revision:"MiMyzd8W_miLiPvZeqcFm"},{url:"/_next/static/chunks/pages/_app-6b8597b962983dcb75bc.js",revision:"MiMyzd8W_miLiPvZeqcFm"},{url:"/_next/static/chunks/pages/_error-94ed2348718d59e1af9b.js",revision:"MiMyzd8W_miLiPvZeqcFm"},{url:"/_next/static/chunks/pages/counter-ca12b866605e64877f2d.js",revision:"MiMyzd8W_miLiPvZeqcFm"},{url:"/_next/static/chunks/pages/index-f1fa4928bf11f9bb477b.js",revision:"MiMyzd8W_miLiPvZeqcFm"},{url:"/_next/static/chunks/pages/kanye-8896b90e3c910b1d0230.js",revision:"MiMyzd8W_miLiPvZeqcFm"},{url:"/_next/static/chunks/pages/orders-1610404adfb85ff7c043.js",revision:"MiMyzd8W_miLiPvZeqcFm"},{url:"/_next/static/chunks/polyfills-a54b4f32bdc1ef890ddd.js",revision:"MiMyzd8W_miLiPvZeqcFm"},{url:"/_next/static/chunks/webpack-6aa24242c38afc8913a0.js",revision:"MiMyzd8W_miLiPvZeqcFm"},{url:"/images/Spinner-1s-200px.svg",revision:"aa5f6f37b3316a8e1178763184445716"},{url:"/images/clocker_logo_black.png",revision:"7c9c89c4ba04665cb428c075a9dbe6f1"},{url:"/images/clocker_pink_logo.png",revision:"083c98434d6ad468689cd47c99051b9f"},{url:"/images/decoration.png",revision:"af28916c1545ebf7b04593492fbe8702"},{url:"/images/elegant_top.png",revision:"d30835a03cc7fb0d712250e5d7e21588"},{url:"/images/icon-192x192.png",revision:"d5d322e61b3d72d740feb8909d77e551"},{url:"/images/icon-256x256.png",revision:"0f4cca7502eb33e57662a0180ce37c85"},{url:"/images/icon-384x384.png",revision:"6a37af5f7270dc0ab1cf8b86aec22bb0"},{url:"/images/icon-512x512.png",revision:"00721ddf96a52b715f47cc1602a1cdb3"},{url:"/images/icon_pink-192x192.png",revision:"e2c0770fe6b6b5c1f4388f810de3a476"},{url:"/images/icon_pink-256x256.png",revision:"b0e74bf50652db2ee1b2f0622665b282"},{url:"/images/icon_pink-384x384.png",revision:"95c8e38cbbab183444cdb091527c6a4f"},{url:"/images/icon_pink-512x512.png",revision:"ea2d16fab91f3fca04070de4f3897be7"},{url:"/images/logo.png",revision:"d830fdd7f1e46ff6eb562bb1dc9204ba"},{url:"/images/welcome.jpeg",revision:"54deab285578c17a0923c042eda762d0"},{url:"/manifest.json",revision:"30050192646e8d7fde3c5d987e3ab5f3"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:i,event:s,state:n})=>i&&"opaqueredirect"===i.type?new Response(i.body,{status:200,statusText:"OK",headers:i.headers}):i}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:mp3|mp4)$/i,new e.StaleWhileRevalidate({cacheName:"static-media-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const i=e.pathname;return!i.startsWith("/api/auth/")&&!!i.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600,purgeOnQuotaError:!0})]}),"GET")}));
