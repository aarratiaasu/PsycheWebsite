# PsycheWebsite Resource Path Fix

## Issue

The website is experiencing 404 errors when trying to load resources from paths like `/res/font/GenosThin_Regular.json` and `/res/models/nasaLogo.glb`. This is happening because the JavaScript code is using absolute paths (`/res/...`) which are being resolved relative to the domain root on GitHub Pages (`https://aarratiaasu.github.io/res/...`), but the resources are actually located at `https://aarratiaasu.github.io/PsycheWebsite/res/...`.

