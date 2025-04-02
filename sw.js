// Service Worker for PsycheWebsite
// This service worker intercepts requests for resources and redirects them to the correct location

const CACHE_NAME = 'psyche-website-cache-v1';
const BASE_URL = '/PsycheWebsite';

// Resources that need to be redirected
const REDIRECT_RESOURCES = [
  '/res/font/GenosThin_Regular.json',
  '/res/font/Roboto_Regular.json',
  '/res/models/nasaLogo.glb',
  '/res/models/navigation_pin.glb',
  '/res/models/arcade_controller.glb'
];

// Install event - cache basic resources
self.addEventListener('install', event => {
  console.log('Service Worker: Installed');
  
  // Skip waiting to ensure the new service worker activates immediately
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker: Activated');
  
  // Claim clients to ensure the service worker controls all pages immediately
  event.waitUntil(clients.claim());
});

// Fetch event - intercept network requests
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  const path = url.pathname;
  
  // Check if this is a resource that needs to be redirected
  if (REDIRECT_RESOURCES.includes(path) || path.startsWith('/res/')) {
    console.log('Service Worker: Redirecting resource', path);
    
    // Construct the correct URL
    const correctUrl = new URL(BASE_URL + path, url.origin);
    
    // Fetch the resource from the correct location
    event.respondWith(
      fetch(correctUrl)
        .then(response => {
          // If successful, return the response
          if (response.ok) {
            return response;
          }
          
          // If not successful, log an error and fall back to the original request
          console.error('Service Worker: Failed to fetch redirected resource', correctUrl.href);
          return fetch(event.request);
        })
        .catch(error => {
          console.error('Service Worker: Error fetching redirected resource', error);
          return fetch(event.request);
        })
    );
  }
});
