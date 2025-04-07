// Service Worker for PsycheWebsite
// This service worker intercepts requests for resources and redirects them to the correct location
// It also provides a custom 404 page for resources that cannot be found

const CACHE_NAME = 'psyche-website-cache-v1';
// Dynamically determine the base URL based on the repository name
const BASE_URL = location.pathname.split('/')[1] ? '/' + location.pathname.split('/')[1] : '';

/**
 * Resources that need to be redirected
 *
 * This Set contains paths to resources that require redirection to the correct location
 * based on the repository name. Resources are organized by type for better maintainability.
 *
 * Using a Set instead of an Array for O(1) lookup performance.
 */
const REDIRECT_RESOURCES = new Set([
  // Font resources
  '/res/font/GenosThin_Regular.json',
  '/res/font/Roboto_Regular.json',
  
  // 3D Model resources
  '/res/models/nasaLogo.glb',
  '/res/models/navigation_pin.glb',
  '/res/models/arcade_controller.glb',
  
  // CSS assets
  '/assets/index-rgFOEOuc.css',
  
  // JavaScript assets
  '/assets/index-Vy6LOWVX.js',
  '/assets/viewportspacepic-BMLYPJMw.js',
  '/assets/viewportspacepic-vBhYZtMZ.js', // Added new asset
  '/assets/index-JOHF8NKl.js',
  '/assets/index-CpqhUVrE.js',
  
  // Distribution folder assets (may be at root in production)
  '/dist/assets/index-JOHF8NKl.js',
  '/dist/assets/index-CpqhUVrE.js',
  
  // Image assets
  '/assets/psyche_badge-DgbJMAPd.svg'
]);

// HTML template for 404 page
const NOT_FOUND_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Resource Not Found</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      text-align: center;
      padding: 50px;
      background-color: #f0f0f0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    h1 {
      color: #333;
    }
    p {
      color: #666;
      margin-bottom: 20px;
    }
    a {
      color: #0066cc;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    #redirect-message {
      display: none;
    }
  </style>
  <script>
    // This script handles redirects for missing resources
    document.addEventListener('DOMContentLoaded', function() {
      // Extract the requested path from the URL
      const path = window.location.pathname;
      
      // Check if this is a resource or asset path
      if (path.startsWith('/res/') || path.startsWith('/assets/')) {
        // Show redirect message
        document.getElementById('redirect-message').style.display = 'block';
        
        // Get the repository name from the current URL
        const repoName = location.pathname.split('/')[1];
        
        // Construct the correct path
        const correctPath = '/' + repoName + path;
        
        // Redirect to the correct resource path
        setTimeout(function() {
          window.location.href = correctPath;
        }, 1000); // Short delay to show the message
      } else if (path === '/') {
        // If at the root, redirect to the main page
        window.location.href = './';
      } else {
        // For other paths, show the 404 message
        document.getElementById('not-found-message').style.display = 'block';
      }
    });
  </script>
</head>
<body>
  <div class="container">
    <h1>Page Not Found</h1>
    
    <div id="redirect-message">
      <p>Redirecting to the correct resource location...</p>
      <p>If you are not redirected automatically, please <a href="./">click here</a> to go to the homepage.</p>
    </div>
    
    <div id="not-found-message">
      <p>The page you are looking for does not exist.</p>
      <p>Please <a href="./">click here</a> to go to the homepage.</p>
    </div>
  </div>
</body>
</html>
`;

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
  if (REDIRECT_RESOURCES.has(path) ||
      path.startsWith('/res/') ||
      path.startsWith('/assets/') ||
      path.startsWith('/dist/') ||
      path.includes('/assets/') ||
      path.includes('/res/') ||
      path.includes('/public/')) {
    console.log('Service Worker: Redirecting resource', path);
    
    // Get the repository name from the current URL
    const repoName = self.location.pathname.split('/')[1] || '';
    const repoPath = repoName ? '/' + repoName : '';
    
    // Handle different path formats
    let adjustedPath = path;
    
    // If the path starts with ./ (relative path), remove the dot
    if (adjustedPath.startsWith('./')) {
      adjustedPath = adjustedPath.substring(1);
    }
    
    // If the path doesn't start with /, add it
    if (!adjustedPath.startsWith('/')) {
      adjustedPath = '/' + adjustedPath;
    }
    
    // If the path includes /dist/ but we're in production, remove the /dist part
    // This handles the case where resources are in a dist folder during development
    // but are at the root in production (GitHub Pages)
    if (adjustedPath.includes('/dist/') && repoPath) {
      adjustedPath = adjustedPath.replace('/dist', '');
    }
    
    // Remove '/public/' prefix from paths
    if (adjustedPath.includes('/public/')) {
      // Don't redirect psycheName/public paths - let them be handled directly
      if (adjustedPath.includes('/psycheName/public/')) {
        // Skip redirection for psycheName paths
        console.log('Service Worker: Skipping redirection for psycheName path:', adjustedPath);
        return fetch(event.request);
      } else {
        adjustedPath = adjustedPath.replace('/public/', '/');
      }
    }
    
    // Special case for surface2.html and location2.html
    if (adjustedPath.includes('/PsycheJR/surface2.html') || adjustedPath.includes('/PsycheJR/location2.html')) {
      // Make sure the path starts with the repository name
      if (repoName && !adjustedPath.startsWith('/' + repoName)) {
        adjustedPath = '/' + repoName + '/PsycheJR/' + adjustedPath.split('/PsycheJR/')[1];
      }
    }
    
    // Check if the path already includes the repository name to avoid duplication
    let finalPath;
    if (repoName && adjustedPath.startsWith('/' + repoName + '/')) {
      // Path already includes repo name, don't add it again
      finalPath = adjustedPath;
    } else {
      // Path doesn't include repo name, add it
      finalPath = repoPath + adjustedPath;
    }
    
    // Construct the correct URL
    const correctUrl = new URL(finalPath, url.origin);
    
    console.log('Service Worker: Redirecting from', path, 'to', correctUrl.href);
    
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
  } else {
    // For navigation requests (HTML pages)
    if (event.request.mode === 'navigate') {
      event.respondWith(
        fetch(event.request)
          .then(response => {
            // If the page exists, return it
            if (response.ok) {
              return response;
            }
            
            // If the page doesn't exist, return our custom 404 page
            console.log('Service Worker: Page not found, returning custom 404', path);
            return new Response(NOT_FOUND_HTML, {
              status: 404,
              statusText: 'Not Found',
              headers: new Headers({
                'Content-Type': 'text/html'
              })
            });
          })
          .catch(error => {
            console.error('Service Worker: Error fetching page', error);
            // Return custom 404 page on network errors too
            return new Response(NOT_FOUND_HTML, {
              status: 404,
              statusText: 'Not Found',
              headers: new Headers({
                'Content-Type': 'text/html'
              })
            });
          })
      );
    }
  }
});