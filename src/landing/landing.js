/*
 * File: landing.js
 * Purpose: Initializes and manages the main Three.js scene for the interactive simulation.
 * Author(s): 
 * Date: 20 FEB 2025
 * Version: 1.0
 *
 * Description:
 * This script sets up the primary Three.js scene, including camera, renderer,
 * lighting, navigation, and section loading. It integrates additional modules
 * for interactivity and scene enhancements like starfields and sun effects.
 *
 * Functions:
 * - init(): Initializes the entire scene and starts the animation loop.
 * - updateDebugPanel(): Updates the on-screen debug panel with current camera data.
 * - animate(): Animation loop handling frame updates and rendering.
 */

import * as THREE from 'three';
import { enableTextInteractivity, enableModelClick } from './utils.js';
import { createStarfield, loadSun } from './starfield.js';
import { initSectionTracking, getCurrentSection, onResize } from './sectionTracking.js';
import { animateScrollIndicator, setupNavigation } from './nav.js';
import { loadSection0 } from './section0.js';
import { loadSection1 } from './section1.js';
import { loadSection2 } from './section2.js';
import { loadSection3, renderSection3 } from './section3.js';
import { loadSection4, renderSection4 } from './section4.js';
import { loadSection5 } from './section5.js';
import { loadSection6 } from './section6.js';
import { loadSection8, renderSection8 } from './section8.js';
import { loadSection7 } from './section7.js';


/*
* Initializes the Three.js scene, camera, renderer, and UI elements.
* Sets up lighting, navigation, interactivity, and loads all scene sections.
*/
function init() {
  animateScrollIndicator();

  let scrollProgress = 1;
  let currentSection = 1;
  
  const sections = [
    { name: "REFERENCES", position: { x: 0, y: 200, z: -60 } },
    { name: "WELCOME", position: { x: 0, y: 0, z: 13 } },
    { name: "PSYCHE", position: { x: 20, y: 30, z: 10 } },
    { name: "BALANCE", position: { x: 40, y: -60, z: -260 } },
    { name: "LIFE ON PSYCHE", position: { x: 40, y: 60, z: -200 } },
    { name: "DEEP SPACE", position: { x: 40, y: 100, z: -300 } },
    { name: "DEEP SPACE2", position: { x: 120, y: -60, z: 60 } },
    { name: "SEVEN", position: { x: 200, y: 300, z: -110 } },           
    { name: "SPACEPIC", position: { x: 250, y: 250, z: -150 } }         
];

  setupNavigation(sections);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);

  // THE CAMERA IS SET TO ALWAYS LOOK AT (0, 0, -1). THIS ENSURES SMOOTHER TRANSITIONS WHEN USING 
  // GSAP TO ANIMATE FROM ONE PLACE TO THE NEXT.
  camera.position.set(0, 0, 13);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.getElementById('canvas-container').appendChild(renderer.domElement);

  // Lighting 
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0x7a5f3e, 10);
  directionalLight.position.set(-15, 5, 5);
  scene.add(directionalLight);

  // section tracking - handles the camera's moveTo function
  initSectionTracking(camera, sections, renderer);

  // Performance based adaptive rendering
  const isLowPerformance = navigator.hardwareConcurrency < 4 || window.devicePixelRatio < 1.5;
  const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
  // passed to fx
  const starDensity = isLowPerformance ? 0.5 : 1.0; 
  const bloomStrength = isLowPerformance ? 1.0 : 2.0; 


  // Debug panel for development. will delete this later
  const debugPanel = document.getElementById('debug-panel');
  /*
  * Updates the debug panel with current section and camera position.
  */  
  function updateDebugPanel() {
    const currentSection = getCurrentSection();
    debugPanel.innerHTML = `
      <strong>Current Section:</strong>
      ${currentSection}<br>
      <strong>Camera Position:</strong><br>
      X: ${camera.position.x.toFixed(2)}<br>
      Y: ${camera.position.y.toFixed(2)}<br>
      Z: ${camera.position.z.toFixed(2)}<br>
      Is Mobile: ${ isMobile }<br>
      Concurrency: ${navigator.hardwareConcurrency}<br>
      PixelRatio: ${window.devicePixelRatio}
    `;
  }

  /*
  * Animation loop that updates the debug panel and renders the scene.
  */
  function animate() {
    requestAnimationFrame(animate);
    updateDebugPanel();
    if (composer) {
      composer.render();
    } else {
      renderer.render(scene, camera);
    }    
    // need to implement rendering these sections ONLY if they are actively displayed
    renderSection3(camera,scene);
    renderSection8(camera,scene);
    renderSection4(camera,scene);
  }

  // Enable text interactivity before loading models
  enableTextInteractivity(camera, scene, renderer);

  // Load the sun effect and composer setup
  const composer = loadSun(scene, renderer, camera, bloomStrength);

  // Load all scene sections and initialize background
  Promise.all([
    loadSection0(scene),
    loadSection1(scene, camera),
    loadSection2(scene, camera),
    loadSection3(scene, camera, sections),
    loadSection4(scene, camera, sections),
    loadSection5(scene, camera),
    loadSection6(scene, camera, sections),
    loadSection7(scene, camera, sections),
    loadSection8(scene, camera)
  ]).then(() => {
    console.log("All sections loaded.");

    createStarfield(scene, { density: starDensity });

    //initBackgroundSwitcher(scene);
    enableModelClick(camera, renderer);
    animate();
    onResize(camera, renderer);

  }).catch(error => {
    console.error("Error loading sections:", error);
  });

  window.addEventListener('resize', () => {
    if (camera && renderer) {
        onResize(camera, renderer);
    } else {
        console.warn("Resize event fired, but camera or renderer is not defined.");
    }
});

}

init();
