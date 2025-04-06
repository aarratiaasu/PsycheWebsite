// GitHub Pages Deployment Helper
// This script helps ensure that paths are correctly configured for GitHub Pages

// Get the repository name from the URL
function getRepoName() {
  const path = window.location.pathname;
  const parts = path.split('/');
  
  // If we're on GitHub Pages, the first part of the path after the domain will be the repo name
  if (parts.length > 1) {
    return parts[1];
  }
  
  return '';
}

// Fix resource paths by adding the repository name prefix if needed
function fixResourcePath(path) {
  // If the path already starts with the repo name or is a relative path, leave it as is
  if (path.startsWith('./') || path.startsWith('../')) {
    return path;
  }
  
  // If it's an absolute path starting with /, add the repo name
  if (path.startsWith('/')) {
    const repoName = getRepoName();
    if (repoName) {
      return '/' + repoName + path;
    }
  }
  
  return path;
}

// Log deployment information
console.log('GitHub Pages Deployment Helper loaded');
console.log('Repository name detected:', getRepoName());
console.log('Current path:', window.location.pathname);

// Export functions for use in other scripts
window.deployHelper = {
  getRepoName,
  fixResourcePath
};