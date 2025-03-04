/**
 * Section 2 - Kids Viewer
 */

import * as THREE from 'three';
import { getCurrentSection } from './sectionTracking.js';
import { showKidsViewport, hideKidsViewport } from './kidsViewport.js';

let hasShownViewport = false;
let sectionInitialized = false;

export function loadSection2(scene, camera) {
    // No visual elements needed
    // The iframe will automatically open when entering section 2
    sectionInitialized = true;
}

export function renderSection2(camera, scene) {
    if (!sectionInitialized) return;
    
    const currentSection = getCurrentSection();
    const isVisible = currentSection === 2;

    // Auto-show viewport when entering section 2
    if (isVisible && !hasShownViewport) {
        // Add a small delay to ensure the section transition is complete
        setTimeout(() => {
            showKidsViewport();
            hasShownViewport = true;
        }, 500);
    } else if (!isVisible && hasShownViewport) {
        // Hide viewport when leaving section 2
        hideKidsViewport();
        hasShownViewport = false;
    }
}
