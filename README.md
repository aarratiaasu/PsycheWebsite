# PsycheWebsite Resource Path Fix

## Issue

The website is experiencing 404 errors when trying to load resources from paths like `/res/font/GenosThin_Regular.json` and `/res/models/nasaLogo.glb`. This is happening because the JavaScript code is using absolute paths (`/res/...`) which are being resolved relative to the domain root on GitHub Pages (`https://aarratiaasu.github.io/res/...`), but the resources are actually located at `https://aarratiaasu.github.io/PsycheWebsite/res/...`.

## Essential Files for GitHub Pages

For the website to function properly on GitHub Pages, the following files are essential:

1. **index.html** - The main entry point for the website. GitHub Pages serves this file by default when visitors access the site.

2. **404.html** - Custom error page that handles missing pages and contains logic to redirect resource requests to the correct paths. This improves user experience and helps fix path-related issues.

3. **sw.js** (Service Worker) - Intercepts network requests and redirects them to include the "/PsycheWebsite" prefix in the path. This is critical for fixing the resource path issues and preventing 404 errors when accessing resources.

These three files work together to ensure that all resources are properly loaded from the correct paths on GitHub Pages.
