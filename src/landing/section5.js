/**
 * Section 5 - Psyche Website Viewport
 */

import { getCurrentSection } from './sectionTracking.js';
import { showWebsiteViewport, hideWebsiteViewport } from './websiteViewport.js';

let hasShownViewport = false;
let sectionInitialized = false;

export function loadSection5(scene, camera) {
    // No visual elements needed
    // The iframe will automatically open when entering section 5
    sectionInitialized = true;
}

export function renderSection5(camera, scene) {
    if (!sectionInitialized) return;
    
    const currentSection = getCurrentSection();
    const isVisible = currentSection === 5;

    // Auto-show viewport when entering section 5
    if (isVisible && !hasShownViewport) {
        // Add a small delay to ensure the section transition is complete
        setTimeout(() => {
            showWebsiteViewport();
            hasShownViewport = true;
        }, 500);
    } else if (!isVisible && hasShownViewport) {
        // Hide viewport when leaving section 5
        hideWebsiteViewport();
        hasShownViewport = false;
    }
}
