/*
 * File: section0.js
 * Purpose: Loads and initializes the "References" section within the Three.js scene.
 * Author(s): 
 * Date: 20 FEB 2025
 * Version: 1.0
 *
 * Description:
 * This script sets up the "References" section, adding title text, interactive menu items,
 * and a badge element. It utilizes utility functions for creating text meshes, menus, and loading assets.
 *
 * Functions:
 * - loadSection0(): Initializes the "References" section with text, menu, and badge.
 */

import { createTextMesh, loadModel, createMenu, loadBadge } from './utils.js';

/*
 * Loads and initializes the "References" section in the Three.js scene.
 * Adds a main title, interactive menu options, and a badge element.
 *
 * Parameters:
 * - scene: The Three.js scene where the section elements will be added.
 */
export function loadSection0(scene) {
  const mainTextPosition = { x: -155, y: -148, z: 3 };
  const mainTextRotation = { x: 0, y: 0.1, z: 0 };

  // Create main section title text
  createTextMesh("REFERENCES", mainTextPosition, mainTextRotation, 1, scene);

  // Define interactive menu items with click handlers
  const menuItems = [
    { text: "Development Team", onClick: () => console.log("DevTeam Clicked") },
    { text: "Sponsor", onClick: () => console.log("Sponsor Clicked") },
    { text: "Code", onClick: () => console.log("Explore Clicked") },
    { text: "Images", onClick: () => console.log("Surface Clicked") }
  ];

  // Create menu in the scene
  createMenu(menuItems, mainTextPosition, mainTextRotation, scene);

  // Load badge element
  loadBadge(scene);
}
