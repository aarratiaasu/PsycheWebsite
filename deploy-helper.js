/**
 * deploy-helper.js
 * 
 * This script provides utility functions for fixing paths in a GitHub Pages environment.
 * It helps resolve paths correctly whether the site is running locally or deployed to GitHub Pages.
 */

// Get the repository name from the current URL
function getRepoPath() {
  const pathSegments = window.location.pathname.split('/');
  // If we're on GitHub Pages, the first segment after the domain will be the repo name
  const repoName = pathSegments[1] && !pathSegments[1].includes('.') ? pathSegments[1] : '';
  return repoName ? '/' + repoName : '';
}

// Fix a path to work in both local and GitHub Pages environments
function fixPath(path) {
  // If the path is already absolute with the repo name, return it as is
  if (path.startsWith(getRepoPath() + '/')) {
    return path;
  }
  
  // Remove any '/public/' prefix from the path
  let adjustedPath = path;
  if (adjustedPath.includes('/public/')) {
    adjustedPath = adjustedPath.replace('/public/', '/');
  }
  
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
  const repoPath = getRepoPath();
  if (adjustedPath.includes('/dist/') && repoPath) {
    adjustedPath = adjustedPath.replace('/dist', '');
  }
  
  // Special case for surface2.html and location2.html
  if (adjustedPath.includes('/PsycheJR/surface2.html') || adjustedPath.includes('/PsycheJR/location2.html')) {
    // Make sure we're using the correct path
    const fileName = adjustedPath.includes('surface2.html') ? 'surface2.html' : 'location2.html';
    adjustedPath = '/PsycheJR/' + fileName;
  }
  
  // Add the repository name to the path
  return repoPath + adjustedPath;
}

// Fix all resource paths in the document
function fixAllPaths() {
  // Fix script src attributes
  document.querySelectorAll('script[src]').forEach(script => {
    const src = script.getAttribute('src');
    if (src && !src.startsWith('http') && !src.startsWith('//')) {
      script.setAttribute('src', fixPath(src));
    }
  });
  
  // Fix link href attributes
  document.querySelectorAll('link[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (href && !href.startsWith('http') && !href.startsWith('//')) {
      link.setAttribute('href', fixPath(href));
    }
  });
  
  // Fix img src attributes
  document.querySelectorAll('img[src]').forEach(img => {
    const src = img.getAttribute('src');
    if (src && !src.startsWith('http') && !src.startsWith('//') && !src.startsWith('data:')) {
      img.setAttribute('src', fixPath(src));
    }
  });
  
  // Fix a tags href attributes
  document.querySelectorAll('a[href]').forEach(a => {
    const href = a.getAttribute('href');
    if (href && !href.startsWith('http') && !href.startsWith('//') && !href.startsWith('#') && !href.startsWith('mailto:')) {
      a.setAttribute('href', fixPath(href));
    }
  });
  
  // Fix iframe src attributes
  document.querySelectorAll('iframe[src]').forEach(iframe => {
    const src = iframe.getAttribute('src');
    if (src && !src.startsWith('http') && !src.startsWith('//')) {
      // Remove any '/public/' prefix from the path
      let cleanSrc = src;
      if (cleanSrc.includes('/public/')) {
        cleanSrc = cleanSrc.replace('/public/', '/');
      }
      iframe.setAttribute('src', fixPath(cleanSrc));
    }
  });
}

// Function to fix import paths in JavaScript modules
function fixImportPath(path) {
  // Only fix relative paths, not absolute URLs or node_module imports
  if (path.startsWith('./') || path.startsWith('../') || (!path.startsWith('/') && !path.startsWith('http') && !path.includes(':'))) {
    return fixPath(path);
  }
  return path;
}

// Export the functions for use in other scripts
window.deployHelper = {
  getRepoPath,
  fixPath,
  fixAllPaths,
  fixImportPath,
  // Force reload the service worker
  reloadServiceWorker: function() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(registrations => {
        for (let registration of registrations) {
          registration.unregister();
        }
        // After unregistering, reload the page to get a fresh service worker
        window.location.reload();
      });
    }
  }
};

// Function to fix iframe src attributes
function fixIframeSrc(iframe) {
  if (iframe && iframe.src) {
    const src = iframe.getAttribute('src');
    if (src && !src.startsWith('http') && !src.startsWith('//')) {
      // Remove any '/public/' prefix from the path
      let cleanSrc = src;
      if (cleanSrc.includes('/public/')) {
        cleanSrc = cleanSrc.replace('/public/', '/');
      }
      
      // Special case for psycheName path
      if (cleanSrc.includes('/psycheName/public/name/')) {
        cleanSrc = './psycheName/public/name/psycheName.html';
      }
      
      // Special case for surface2.html and location2.html
      if (cleanSrc.includes('/PsycheJR/surface2.html') || cleanSrc.includes('/PsycheJR/location2.html')) {
        const fileName = cleanSrc.includes('surface2.html') ? 'surface2.html' : 'location2.html';
        cleanSrc = './PsycheJR/' + fileName;
      }
      
      iframe.setAttribute('src', fixPath(cleanSrc));
    }
  }
}

// Add fixIframeSrc to the exported functions
window.deployHelper.fixIframeSrc = fixIframeSrc;

// Automatically fix paths when the DOM is loaded
document.addEventListener('DOMContentLoaded', fixAllPaths);

// Create a MutationObserver to watch for dynamically added iframes
const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    if (mutation.addedNodes) {
      mutation.addedNodes.forEach(node => {
        // Check if the added node is an iframe
        if (node.tagName === 'IFRAME') {
          fixIframeSrc(node);
        }
        // Check if the added node contains iframes
        if (node.querySelectorAll) {
          node.querySelectorAll('iframe').forEach(iframe => {
            fixIframeSrc(iframe);
          });
        }
      });
    }
  });
});

// Start observing the document with the configured parameters
observer.observe(document.body, {
  childList: true,
  subtree: true
});