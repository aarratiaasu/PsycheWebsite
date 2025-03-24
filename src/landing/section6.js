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

import * as THREE from 'three';
import { triggerButton3D, clickableModels, applyGlowEffect } from './utils.js';
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
export function loadSection6(scene, camera, sections, renderer) {
  const cameraPosition = sections[6];
  const modelOffset = 30;

  // Position the model slightly in front of the camera
  const modelPosition = {
    x: cameraPosition.x,
    y: cameraPosition.y,
    z: cameraPosition.z - modelOffset
  };

  // Load the NASA Logo model into the scene (can be replaced with a game controller model if available)
  // loadModel(
  //   "nasaLogo",                          // Model name
  //   "/res/models/nasaLogo.glb",          // Model file path
  //   modelPosition,                       // Position in the scene
  //   1,                                   // Scale factor
  //   { x: 0, y: 0, z: 0 },                // Initial rotation
  //   null,                                // No animation for now
  //   scene, 
  //   (model) => {
  //     console.log("Game section model loaded into Section 6");
  //     gameControllerModel = model;

  //     // Enable frustum culling for performance
  //     model.frustumCulled = true;

  //     // Ensure bounding spheres exist for all meshes within the model
  //     model.traverse((child) => {
  //       if (child.isMesh && child.geometry) { 
  //         if (!child.geometry.boundingSphere) {
  //           child.geometry.computeBoundingSphere();
  //           console.log("added bounding sphere to", child.name);
  //         }
  //       }
  //     });
      
  //     sectionInitialized = true;
  //   }
  // );


//******** NEW BUTTON ********* 
    const section6Coords = sections[6]?.position;
    if (!section6Coords) {
      console.error("Section 6 position not found.");
      return Promise.reject("Section 6 position not found.");
    }
    
    const buttonPos = {
      x: section6Coords.x,
      y: section6Coords.y + 2,
      z: section6Coords.z - 12,
    };
    
    const rotation = { x: 0.2, y: 0, z: 0 };
    
    return new Promise((resolve, reject) => {
      try {
        const { buttonMesh } = triggerButton3D(
          "Try some Psyche inspired games!",
          buttonPos,
          rotation,
          0.7,
          scene,
          () => {
            showGamesViewport();
            console.log("Games button clicked.");
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

  // Removing for now 
  // // Auto-show viewport when entering section 6
  // if (isVisible && !hasShownViewport) {
  //   // Add a small delay to ensure the section transition is complete
  //   setTimeout(() => {
  //     showGamesViewport();
  //     hasShownViewport = true;
  //   }, 500);
  // } else if (!isVisible && hasShownViewport) {
  //   // Hide viewport when leaving section 6
  //   hideGamesViewport();
  //   hasShownViewport = false;
  // }
  
  // Animate the model if needed
  if (gameControllerModel && isVisible) {
    gameControllerModel.rotation.y += 0.01;
  }
}