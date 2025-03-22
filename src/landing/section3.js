/**
 * Section 3 - PsycheJR
 */

import * as THREE from 'three';
import { getCurrentSection } from './sectionTracking.js';
import { triggerButton3D, clickableModels } from './utils.js';
import { showKidsViewport, hideKidsViewport } from '../../public/PsycheJR/kidsViewport.js';

let yearButton;
let hasShownViewport = false;

export function loadSection3(scene, camera, sections, renderer) {
    const section3Coords = sections[3]?.position;
    if (!section3Coords) {
      console.error("Section 3 position not found.");
      return Promise.reject("Section 3 position not found.");
    }
  
    const buttonPos = {
      x: section3Coords.x,
      y: section3Coords.y + 6,
      z: section3Coords.z - 12,
    };
  
    const rotation = { x: 0.2, y: 0, z: 0 };
  
    return new Promise((resolve, reject) => {
      try {
        const { buttonMesh } = triggerButton3D(
          "PsycheJR",
          buttonPos,
          rotation,
          0.7,
          scene,
          () => {
            showKidsViewport();
            console.log("PsycheJR button clicked.");
          }
        );
  
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
        console.error("Error loading Section 3:", err);
        reject(err);
      }
    });
  }

  export function renderSection3(camera, scene) {
    const currentSection = getCurrentSection();
    const isVisible = currentSection === 3;
  
    // You can still toggle visibility for any section3-specific objects here 
  }