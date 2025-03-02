/*
 * File: sectionTracking.js
 * Purpose: Manages camera navigation between different sections in the Three.js scene.
 * Author(s): 
 * Date: 20 FEB 2025
 * Version: 1.0
 *
 * Description:
 * This script handles camera movement and section tracking within the Three.js scene.
 * It processes user input (scroll and touch) to navigate between predefined sections,
 * ensures responsive resizing, and uses GSAP for smooth transitions.
 *
 * Functions:
 * - initSectionTracking(): Initializes section tracking with camera, sections, and renderer.
 * - onResize(): Adjusts camera and renderer on window resize.
 * - onScroll(): Handles scroll events to navigate between sections.
 * - moveToSection(): Smoothly transitions the camera to the specified section.
 * - getCurrentSection(): Returns the index of the current section.
 */

import gsap from 'gsap';
import * as THREE from 'three';

let camera, renderer, sections, currentSection = 1, scrollProgress = 1;
let isAnimating = false; // Scroll lock flag

/*
* Initializes section tracking by assigning the camera, section list,
* and renderer. Adds event listeners for scroll, touchmove, and window resize.
*
* Parameters:
* - cam: The Three.js camera to be controlled.
* - sectionList: Array of section positions for navigation.
* - rend: The Three.js renderer for viewport updates.
*/
export function initSectionTracking(cam, sectionList, rend) {
  camera = cam;
  sections = sectionList;
  renderer = rend;
  window.addEventListener("wheel", onScroll);
  window.addEventListener("touchmove", onScroll);
  window.addEventListener('resize', onResize);
}

/*
* Adjusts the camera aspect ratio and updates the renderer size
* when the window is resized to maintain correct proportions.
*/
function onResize() {

  const aspect = window.innerWidth / window.innerHeight;

  camera.aspect = aspect;
  camera.updateProjectionMatrix();

  if (renderer) {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }
}

/*
* Handles scroll and touchmove events to update the camera's scroll progress.
* Triggers section transitions when crossing section thresholds.
*
* Parameters:
* - event: The scroll or touchmove event triggering navigation.
*/
export function onScroll(event) {
  if (isAnimating) return;
  scrollProgress += event.deltaY * 0.005;
  scrollProgress = Math.max(0, Math.min(scrollProgress, sections.length - 1));

  const newSection = Math.round(scrollProgress);
  if (newSection !== currentSection) {
    isAnimating = true;
    moveToSection(newSection);
  }
}

/*
* Smoothly transitions the camera to the specified section using GSAP.
* Supports optional camera orientation adjustments during movement.
*
* Parameters:
* - sectionIndex: Index of the section to move to.
* - lookAt: Optional THREE.Vector3 position for the camera to look at.
*/
export function moveToSection(sectionIndex, lookAt = null) {
  if (sectionIndex < 0 || sectionIndex >= sections.length) return;
  currentSection = sectionIndex;
  scrollProgress = sectionIndex;

  const sectionPos = sections[sectionIndex];
  const duration = 2;

  gsap.to(camera.position, {
    x: sectionPos.x,
    y: sectionPos.y,
    z: sectionPos.z,
    duration: duration,
    ease: "power4.inOut",
    onUpdate: () => {
      if (lookAt && sectionIndex === 6) {
        // camera.lookAt(lookAt.x, lookAt.y, lookAt.z); // Optional: Look at model in section 6
        console.log("yay!");
      }
    },
    onComplete: () => {
      if (sectionIndex !== 6) {
        const resetLookAt = new THREE.Vector3(
          camera.position.x,
          camera.position.y,
          camera.position.z - 1 // Look directly along negative Z-axis
        );
        // camera.lookAt(resetLookAt);
      }

      isAnimating = false;
      console.log("Moved to Section:", currentSection);

      const direction = new THREE.Vector3();
      camera.getWorldDirection(direction);
      console.log('Camera is now looking in direction:', direction);
    }
  });
}

/*
* Logs the current camera direction vector to the console.
* Useful for debugging camera orientation.
*/
function logCameraDirection() {
  const direction = new THREE.Vector3();
  camera.getWorldDirection(direction);
  console.log('Camera is looking in direction:', direction);
}

/*
* Returns the current section index that the camera is positioned at.
*
* Returns:
* - Number: Index of the current section.
*/
export function getCurrentSection() {
  return currentSection;
}
