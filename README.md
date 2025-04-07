# PsycheWebsite GitHub Pages Deployment

Fixed 404 errors on GitHub Pages by resolving path issues with absolute paths being incorrectly resolved at the domain root.

## Essential Files

- **index.html** - Main entry point
- **404.html** - Error page with path redirection
- **sw.js** - Service worker for request interception
- **deploy-helper.js** - Path resolution utilities
- **.nojekyll** - Prevents Jekyll processing

## Deployment

1. Push to GitHub repository
2. Go to repository settings → Pages
3. Select branch to deploy
4. Save and wait for deployment

