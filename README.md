# PsycheWebsite GitHub Pages Deployment

## Issue Fixed

The website was experiencing 404 errors when deployed to GitHub Pages due to path resolution issues. The JavaScript code was using absolute paths (`/res/...`) which were being resolved relative to the domain root on GitHub Pages (`https://username.github.io/res/...`), but the resources are actually located at `https://username.github.io/repository-name/res/...`.

## Solution Implemented

The following changes have been made to fix the GitHub Pages deployment:

1. **Updated 404.html** - Modified the custom error page to dynamically determine the repository name from the URL and redirect resource requests to the correct paths.

2. **Updated sw.js (Service Worker)** - Modified to dynamically determine the repository name and correctly intercept network requests to include the proper prefix in resource paths.

3. **Created deploy-helper.js** - Added a helper script that provides utility functions for fixing paths in a GitHub Pages environment.

4. **Added .nojekyll file** - Prevents GitHub Pages from processing the site with Jekyll, which can sometimes interfere with path resolution.

5. **Updated github-pages-redirector.html** - Modified to use relative paths instead of hardcoded paths.

## Essential Files for GitHub Pages

For the website to function properly on GitHub Pages, the following files are essential:

1. **index.html** - The main entry point for the website. GitHub Pages serves this file by default when visitors access the site.

2. **404.html** - Custom error page that handles missing pages and contains logic to redirect resource requests to the correct paths.

3. **sw.js** (Service Worker) - Intercepts network requests and redirects them to the correct paths.

4. **deploy-helper.js** - Provides utility functions for path resolution in a GitHub Pages environment.

5. **.nojekyll** - Tells GitHub Pages not to process the site with Jekyll.

These files work together to ensure that all resources are properly loaded from the correct paths on GitHub Pages.

## Deployment Instructions

1. Push all changes to your GitHub repository
2. Go to your repository settings
3. Navigate to the "Pages" section
4. Select the branch you want to deploy (usually "main" or "master")
5. Save the settings and wait for the deployment to complete

Your site should now be accessible at `https://username.github.io/repository-name/` without any 404 errors.
