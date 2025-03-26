/**
 * Section 8 - Space Pic
 */

import * as THREE from 'three';
import { getCurrentSection } from './sectionTracking.js';
import { triggerButton3D, clickableModels, applyGlowEffect, makeModelClickable } from './utils.js';
import gsap from 'gsap';
import { showSpacePicViewport, hideSpacePicViewport } from '../../public/games/viewportspacepic.js';

let hasShownViewport = false;

export function loadSection8(scene, camera, sections, renderer) {
    const section8Coords = sections[8]?.position;
    if (!section8Coords) {
      console.error("Section 8 position not found.");
      return Promise.reject("Section 8 position not found.");
    }
    
    const buttonPos = {
      x: section8Coords.x,
      y: section8Coords.y + 2,
      z: section8Coords.z - 12,
    };
    
    const rotation = { x: 0.2, y: 0, z: 0 };
    
    return new Promise((resolve, reject) => {
      try {
        const { buttonMesh } = triggerButton3D(
          "Capture a Cosmic Picture!",
          buttonPos,
          rotation,
          0.7,
          scene,
          () => {
            showSpacePicViewport();
            console.log("Pc button clicked.");
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

export function renderSection8(camera, scene) {
    // Update render logic as needed.
}
