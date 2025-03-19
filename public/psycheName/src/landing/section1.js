/*
 * File: section1.js
 * Purpose: Loads and initializes the "Year on Psyche" section within the Three.js scene.
 * Author(s): 
 * Date: 20 FEB 2025
 * Version: 1.0
 *
 * Description:
 * This script sets up the "Year on Psyche" section by adding title text, loading the asteroid model,
 * and creating an interactive menu. It enables interactivity on the asteroid model and includes
 * section navigation using the moveToSection function.
 *
 * Functions:
 * - loadSection1(): Loads the "Year on Psyche" section, adds a rotating asteroid model,
 *   and sets up the navigation menu.
 */

import { createTextMesh, loadModel, createMenu, makeModelClickable, createMenuItem } from './utils.js';
import { moveToSection } from './sectionTracking.js';

let asteroidModel = null;
const psycheModelPosition = { x: 20, y: 16, z: -45 };

/*
 * Loads and initializes the "Year on Psyche" section in the Three.js scene.
 * Adds title text, loads an asteroid model, and creates an interactive menu.
 * The asteroid model is made clickable to trigger section navigation.
 *
 * Parameters:
 * - scene: The Three.js scene where the section elements will be added.
 * - camera: The camera used for user interactions and view manipulation.
 *
 * Returns:
 * - Promise: Resolves when the asteroid model is loaded and clickable.
 */
export function loadSection1(scene, camera) {
  const mainTextPosition = { x: -12, y: 3, z: 0 };
  const mainTextRotation = { x: 0, y: Math.PI / 12, z: 0 };

  return new Promise((resolve, reject) => { 
    // Add section title text
    createTextMesh("YEAR ON PSYCHE", mainTextPosition, mainTextRotation, 1.5, scene);

    // Load asteroid model with position, scale, and animation
    loadModel(
      "asteroid",                     
      "/res/models/psyche_new.glb",   // Model path
      { x: 80, y: 60, z: 20 },        // Initial position
      6,                              // Scale factor
      { x: 0, y: 0, z: 0 },           // Initial rotation
      {
        position: { x: 20, y: 16, z: -45, duration: 3, ease: "power2.out" },
        rotation: { y: -6.28319, z: 6.28319, duration: 45, ease: "linear", repeat: -1 }
      },
      scene, 
      (model) => { 
        asteroidModel = model;

        // Make the asteroid clickable to move to Psyche section
        makeModelClickable(asteroidModel, () => {
          console.log("asteroid clicked");
          moveToSection(2, psycheModelPosition);
        });

        resolve();
      }, camera
    );

    // Timeout if model fails to load within 10 seconds
    setTimeout(() => reject("Model load timeout"), 10000); 
  })
  .then(() => {
    const startButton = { text: "Begin the journey", onClick: () => moveToSection(2) }
    // Create navigation menu after the model loads
    const menuItems = [
      { text: "Psyche", onClick: () => moveToSection(2, psycheModelPosition) }, 
      { text: "Section 3", onClick: () => moveToSection(3) },
      { text: "Section 4", onClick: () => moveToSection(4) },
      { text: "Section 5", onClick: () => moveToSection(5) },
      { text: "Section 6", onClick: () => moveToSection(6) },
      { text: "Section 7", onClick: () => moveToSection(7) },
      { text: "References", onClick: () => moveToSection(0) }
    ];
    createMenu(menuItems, mainTextPosition, mainTextRotation, scene);
  })
  .catch((error) => {
    console.error("Error loading Section 1:", error);
  });
}

