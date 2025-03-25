/*
 * File: section6.js - Games Selector
 * Purpose: Loads and initializes Section 6, 
 * Author(s): 
 * Date: 20 FEB 2025
 * Version: 1.0
 *
 * Description:
 * This section displays a game controller model and opens a games selector viewport
 * when the user enters this section.
 * 
 * Functions:
 * - loadSection6(): 
 */

import { loadModel } from './utils.js';
import { getCurrentSection } from './sectionTracking.js';
import { showGamesViewport, hideGamesViewport } from './gamesViewport.js';

let hasShownViewport = false;
let sectionInitialized = false;
let gameControllerModel = null;

/**
 * Loads and initializes Section 6 by adding a game controller model.
 * 
 * Parameters:
 * - scene: The Three.js scene where the model will be added.
 * - camera: The camera used for rendering and positioning context.
 * - sections: Array containing camera positions for each section.
 */
export function loadSection6(scene, camera, sections) {
  return new Promise((resolve, reject) => {
      // Assuming 'cameraPosition' still needs to be set from 'sections'
      const cameraPosition = sections[6];
      const modelOffset = 30;

      // Position the model slightly in front of the camera
      const modelPosition = {
          x: cameraPosition.x,
          y: cameraPosition.y,
          z: cameraPosition.z - modelOffset
      };

      // Here, you can perform any operations needed, or if there are none, resolve immediately
      console.log("Section 6 setup completed without model loading.");
      
      // Assuming there are no further asynchronous operations, we directly resolve the Promise
      resolve();
  });
}


/**
 * Renders Section 6 and handles viewport display logic.
 * 
 * Parameters:
 * - camera: The camera used for rendering.
 * - scene: The Three.js scene.
 */
export function renderSection6(camera, scene) {
  if (!sectionInitialized) return;
  
  const currentSection = getCurrentSection();
  const isVisible = currentSection === 6;

  // Auto-show viewport when entering section 6
  if (isVisible && !hasShownViewport) {
    // Add a small delay to ensure the section transition is complete
    setTimeout(() => {
      showGamesViewport();
      hasShownViewport = true;
    }, 500);
  } else if (!isVisible && hasShownViewport) {
    // Hide viewport when leaving section 6
    hideGamesViewport();
    hasShownViewport = false;
  }
  
  // Animate the model if needed
  if (gameControllerModel && isVisible) {
    gameControllerModel.rotation.y += 0.01;
  }
}