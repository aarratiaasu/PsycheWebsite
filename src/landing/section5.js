/**
 * Section 5 - Psyche Website Viewport
 */

import * as THREE from 'three';
import { getCurrentSection } from './sectionTracking.js';
import { showWebsiteViewport, hideWebsiteViewport } from './websiteViewport.js';
import { triggerButton3D, clickableModels, applyGlowEffect } from './utils.js';

let hasShownViewport = false;
let sectionInitialized = false;

export function loadSection5(scene, camera, sections, renderer) {
    // No visual elements needed
    // The iframe will automatically open when entering section 5
    sectionInitialized = true;

    //******** NEW BUTTON ********* 
    const section5Coords = sections[5]?.position;
    if (!section5Coords) {
      console.error("Section 5 position not found.");
      return Promise.reject("Section 5 position not found.");
    }
    
    const buttonPos = {
      x: section5Coords.x,
      y: section5Coords.y + 2,
      z: section5Coords.z - 12,
    };
    
    const rotation = { x: 0.2, y: 0, z: 0 };
    
    return new Promise((resolve, reject) => {
      try {
        const { buttonMesh } = triggerButton3D(
          "Explore the Mission Website",
          buttonPos,
          rotation,
          0.7,
          scene,
          () => {
            showWebsiteViewport();
            console.log("Psyche Jr button clicked.");
          }
        );
    
        applyGlowEffect(buttonMesh, {
          color: '#ff9900',
          intensity: 2.0
        });
    
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
    
        window.addEventListener("mousemove", (event) => {
          const rect = renderer.domElement.getBoundingClientRect();
          mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
          mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
          raycaster.setFromCamera(mouse, camera);
          const intersects = raycaster.intersectObjects(clickableModels);
    
          renderer.domElement.style.cursor = intersects.length > 0 ? "pointer" : "default";
        });
    
        resolve();
      } catch (err) {
        reject(err);
      }
    });
}

export function renderSection5(camera, scene) {
    if (!sectionInitialized) return;
    
    const currentSection = getCurrentSection();
    const isVisible = currentSection === 5;

    // Rmoving for now
    // // Auto-show viewport when entering section 5
    // if (isVisible && !hasShownViewport) {
    //     // Add a small delay to ensure the section transition is complete
    //     setTimeout(() => {
    //         showWebsiteViewport();
    //         hasShownViewport = true;
    //     }, 500);
    // } else if (!isVisible && hasShownViewport) {
    //     // Hide viewport when leaving section 5
    //     hideWebsiteViewport();
    //     hasShownViewport = false;
    // }
}
