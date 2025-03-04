/**
 * Section 7 - Website Viewer
 */

import * as THREE from 'three';
import { getCurrentSection } from './sectionTracking.js';
import { showWebsiteViewport, hideWebsiteViewport } from './websiteViewport.js';

let hasShownViewport = false;
let sectionInitialized = false;

export function loadSection7(scene, camera) {
    // No visual elements needed
    // The iframe will automatically open when entering section 7
    sectionInitialized = true;
}

export function renderSection7(camera, scene) {
    if (!sectionInitialized) return;
    
    const currentSection = getCurrentSection();
    const isVisible = currentSection === 7;

    // Auto-show viewport when entering section 7
    if (isVisible && !hasShownViewport) {
        // Add a small delay to ensure the section transition is complete
        setTimeout(() => {
            showWebsiteViewport();
            hasShownViewport = true;
        }, 500);
    } else if (!isVisible && hasShownViewport) {
        // Hide viewport when leaving section 7
        hideWebsiteViewport();
        hasShownViewport = false;
    }
}
