if(!self.define){let e,s={};const c=(c,a)=>(c=new URL(c+".js",a).href,s[c]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=s,document.head.appendChild(e)}else e=c,importScripts(c),s()})).then((()=>{let e=s[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(a,n)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let t={};const r=e=>c(e,i),o={module:{uri:i},exports:t,require:r};s[i]=Promise.all(a.map((e=>o[e]||r(e)))).then((e=>(n(...e),t)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/XMlepEzy9UZIBBMlswlOx/_buildManifest.js",revision:"fb0dbadac62db3aba6c5879e305cf50e"},{url:"/_next/static/XMlepEzy9UZIBBMlswlOx/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/163-5f0ab4be55b54a34.js",revision:"5f0ab4be55b54a34"},{url:"/_next/static/chunks/252f366e-8a2e681db9e268a6.js",revision:"8a2e681db9e268a6"},{url:"/_next/static/chunks/7112840a-0f5e83118c29cd67.js",revision:"0f5e83118c29cd67"},{url:"/_next/static/chunks/791-ce761bc953fc7341.js",revision:"ce761bc953fc7341"},{url:"/_next/static/chunks/e90c0614-06ee968124cce45c.js",revision:"06ee968124cce45c"},{url:"/_next/static/chunks/framework-2c79e2a64abdb08b.js",revision:"2c79e2a64abdb08b"},{url:"/_next/static/chunks/main-1cb174da82364de6.js",revision:"1cb174da82364de6"},{url:"/_next/static/chunks/pages/_app-73481379d8b56845.js",revision:"73481379d8b56845"},{url:"/_next/static/chunks/pages/_error-54de1933a164a1ff.js",revision:"54de1933a164a1ff"},{url:"/_next/static/chunks/pages/index-1f3d965c5b003de1.js",revision:"1f3d965c5b003de1"},{url:"/_next/static/chunks/pages/login-cc7212ba214a302e.js",revision:"cc7212ba214a302e"},{url:"/_next/static/chunks/pages/register-0d22bb74a1b173f8.js",revision:"0d22bb74a1b173f8"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-59c5c889f52620d6.js",revision:"59c5c889f52620d6"},{url:"/_next/static/css/75442105e807ac26.css",revision:"75442105e807ac26"},{url:"/_next/static/css/c7a8886310e2625f.css",revision:"c7a8886310e2625f"},{url:"/_next/static/media/1b496f798a642250-s.woff2",revision:"7b77d8d594cc6aee5a915bb083311d4c"},{url:"/_next/static/media/230e62120f6d785b-s.woff2",revision:"669c2c517e561272cbb89b4cc59761c8"},{url:"/_next/static/media/647e3efd824faf1c-s.p.woff2",revision:"40b6965b5cd26213faf61e5ab6765bb9"},{url:"/_next/static/media/75c6578c0e7ebfd8-s.woff2",revision:"d6affb2b0ebb90639a938928787c0364"},{url:"/_next/static/media/ac361f64331e3beb-s.woff2",revision:"f2b8dc1c11b50b628d5e0b12060c3736"},{url:"/_next/static/media/e3e909ff52605f18-s.woff2",revision:"a4fb151402f669c65488dbf5cc735658"},{url:"/_next/static/media/e859973cdb7f6b3d-s.woff2",revision:"a55dba7f3e37a023425d533a5cd83fd9"},{url:"/_next/static/media/fd72bbd943f0444a-s.woff2",revision:"04c0e19395ffb1768f43c638ef367f3e"},{url:"/default-avatar.png",revision:"e238c6b6a21136d5a3bc868da22d2ce4"},{url:"/favicon.ico",revision:"c30c7d42707a47a3f4591831641e50dc"},{url:"/icons/android-chrome-192x192.png",revision:"f6cf6a3c9eb5a82d4725ed8ee9e2d775"},{url:"/icons/android-chrome-512x512.png",revision:"eb9072160a704672c7a0d01ebbffb3a2"},{url:"/icons/apple-touch-icon.png",revision:"abcc0d92f26b00ae660f70b857d86ffa"},{url:"/icons/favicon-16x16.png",revision:"f69d4513f7967d2f4c7127d38f58221e"},{url:"/icons/favicon-32x32.png",revision:"11a8f61ff6ec5652a55268e8fd3b1e14"},{url:"/icons/favicon.ico",revision:"152624c75e75fedae451994bf68dae7c"},{url:"/manifest.json",revision:"c2695a0c3913f546851f1c0059a6e646"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:c,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
