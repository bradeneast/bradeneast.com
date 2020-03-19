import install from './install.js';
import fetch from './fetch.js';
import activate from './activate.js';

export const version = '1::';

// ServiceWorker is a progressive technology. Ignore unsupported browsers
if ('serviceWorker' in navigator) {

    console.log('CLIENT: service worker registration in progress.');

    navigator.serviceWorker.register('/service-worker.min.js').then(function () {
        console.log('CLIENT: service worker registration complete.');
    }, function () { console.log('CLIENT: service worker registration failure.') });

} else { console.log('CLIENT: service worker is not supported.') }


self.addEventListener('install', install);
self.addEventListener('fetch', fetch);
self.addEventListener('activate', activate);