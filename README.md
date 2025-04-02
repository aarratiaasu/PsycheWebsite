# PsycheWebsite Resource Path Fix

## Issue

The website is experiencing 404 errors when trying to load resources from paths like `/res/font/GenosThin_Regular.json` and `/res/models/nasaLogo.glb`. This is happening because the JavaScript code is using absolute paths (`/res/...`) which are being resolved relative to the domain root on GitHub Pages (`https://aarratiaasu.github.io/res/...`), but the resources are actually located at `https://aarratiaasu.github.io/PsycheWebsite/res/...`.

The specific errors are:

1. Missing font files:
   - `/res/font/GenosThin_Regular.json` (404 Not Found)
   - `/res/font/Roboto_Regular.json` (404 Not Found)

2. Missing model files:
   - `/res/models/nasaLogo.glb` (404 Not Found)
   - `/res/models/navigation_pin.glb` (404 Not Found)
   - `/res/models/arcade_controller.glb` (404 Not Found)

## Solution

Since the JavaScript file is compiled and minified, we can't directly edit it to fix the paths. Instead, we've implemented a service worker that intercepts requests for resources and redirects them to the correct location.

### Files Created

1. `sw.js` - Service worker that intercepts requests for resources and redirects them to the correct location.
2. `404.html` - Custom 404 page that redirects requests for missing resources to the correct location.
3. `github-pages-redirector.html` - Simple HTML file that can be placed at the root of the GitHub Pages repository to redirect users to the correct location.

### Implementation Details

1. The service worker (`sw.js`) intercepts requests for resources and redirects them to the correct location. It's registered in the main `index.html` file.

2. The custom 404 page (`404.html`) uses JavaScript to redirect requests for missing resources to the correct location. This is a fallback in case the service worker doesn't catch all requests.

3. The GitHub Pages redirector (`github-pages-redirector.html`) is a simple HTML file that can be placed at the root of the GitHub Pages repository to redirect users to the correct location. This is useful if you want to make `https://aarratiaasu.github.io/` redirect to `https://aarratiaasu.github.io/PsycheWebsite/`.

## Deployment Instructions

1. Make sure all the files (`sw.js`, `404.html`, and `index.html` with the service worker registration) are committed to the repository.

2. If you want to redirect the root of your GitHub Pages site to the PsycheWebsite, rename `github-pages-redirector.html` to `index.html` and place it at the root of your GitHub Pages repository (not inside the PsycheWebsite directory).

3. Configure GitHub Pages to use the `main` branch (or whichever branch you're using) as the source for your site.

4. After deployment, verify that the resources are loading correctly by checking the browser console for any 404 errors.

## Additional Notes

- The service worker will only work on HTTPS or localhost, as service workers require a secure context.
- The service worker will only intercept requests for resources after it's been registered and activated. This means that the first load of the page might still show 404 errors, but subsequent loads should work correctly.
- If you make changes to the service worker, you'll need to reload the page twice for the changes to take effect: once to install the new service worker, and again to activate it.
