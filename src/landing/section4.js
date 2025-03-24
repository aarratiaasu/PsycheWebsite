/**
 * Section 4 - Year on Psyche
 *
 * This module handles loading the year.html content in an iframe
 * that appears on top of the Three.js scene
 */
import * as THREE from 'three';
import gsap from 'gsap';
import { getCurrentSection } from './sectionTracking.js';
import { triggerButton3D, clickableModels, applyGlowEffect  } from './utils.js';
import {
    applyViewportContainerStyles,
    applyHeaderStyles,
    applyTitleStyles,
    applyCloseButtonStyles,
    applyIframeStyles,
    addScrollbarHidingStyles,
    injectScrollbarHidingStyles,
    addShimmerEffect,
    addStarParticles,
    addOpeningAnimations,
    addPulsingGlowEffect,
    createClosingAnimation
} from './viewportStyling.js';

// Button for the section
// let yearButton;
// let yearLabel;
let hasShownViewport = false;

// Keep track of the viewport DOM elements
let viewportContainer = null;
let iframe = null;
let closeButton = null;
let headerElement = null;
let titleElement = null;
let starsContainer = null;
let pulseAnimation = null;

/**
 * Creates and shows the year viewport
 */
export function showYearViewport() {
    // If viewport already exists, just show it
    if (viewportContainer) {
        viewportContainer.style.display = 'flex';
        return;
    }
    
    console.log("Creating Year viewport");
    
    // Create container for the viewport
    viewportContainer = document.createElement('div');
    viewportContainer.id = 'year-viewport-container';
    
    // Apply container styles with custom options
    applyViewportContainerStyles(viewportContainer, {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        borderColor: 'rgb(255, 255, 255)',
        boxShadow: '0 0 20px rgba(255, 255, 204, 0.6)'
    });
    
    // Set custom size
    viewportContainer.style.width = '80%';
    viewportContainer.style.maxWidth = '1440px';
    viewportContainer.style.height = '95vh';
    
    // Create header with title and close button
    headerElement = document.createElement('div');
    applyHeaderStyles(headerElement, {
        backgroundColor: '#f9a000',
        gradientStart: '#f9a000',
        gradientEnd: '#f9a000'
    });
    
    titleElement = document.createElement('h2');
    titleElement.textContent = 'Compare Earth and Psyche';  // Changed from 'Life on Psyche' to 'Year on Psyche'
    applyTitleStyles(titleElement);
    
    closeButton = document.createElement('button');
    closeButton.textContent = '✕';
    applyCloseButtonStyles(closeButton);
    
    headerElement.appendChild(titleElement);
    headerElement.appendChild(closeButton);
    viewportContainer.appendChild(headerElement);
    
    // Create iframe to load the year.html content
    iframe = document.createElement('iframe');
    iframe.src = './year/year.html';  // Updated path to point to the year.html file in public/year
    applyIframeStyles(iframe, {
        backgroundColor: '#222'
    });
    
    // Add event listener for iframe load errors
    iframe.onerror = () => {
        console.error("Failed to load iframe content");
    };
    
    // Add event listener for iframe load success
    iframe.onload = () => {
        console.log("Iframe loaded successfully");
        injectScrollbarHidingStyles(iframe);
    };
    
    viewportContainer.appendChild(iframe);
    document.body.appendChild(viewportContainer);
    
    // Add visual effects
    addShimmerEffect(viewportContainer);
    starsContainer = addStarParticles(viewportContainer, 15);
    
    // Add opening animations
    addOpeningAnimations(viewportContainer, headerElement, iframe);
    
    // Add pulsing glow effect
    pulseAnimation = addPulsingGlowEffect(viewportContainer, {
        color: 'rgba(255, 255, 255, 0.6)',
        intensity: '25px'
    });
    
    // Add scrollbar hiding styles to the document
    addScrollbarHidingStyles(document);
    
    // Add event listener for close button
    closeButton.addEventListener('click', hideYearViewport);
    
    // Add event listener for Escape key
    document.addEventListener('keydown', handleKeyDown);
}

/**
 * Hides the year viewport
 */
export function hideYearViewport() {
    if (!viewportContainer) return;
    
    // Stop the pulsing animation if it exists
    if (pulseAnimation) {
        pulseAnimation.kill();
    }
    
    // Create and play closing animation
    createClosingAnimation(viewportContainer, () => {
        viewportContainer.style.display = 'none';
        // Reset opacity and scale for next time
        viewportContainer.style.opacity = 1;
        viewportContainer.style.transform = 'translate(-50%, -50%) scale(1)';
        
        // Show the menu when viewport is closed
        document.body.classList.add("overlay-open");
        
        // Restart the pulse animation for next time
        if (pulseAnimation) {
            pulseAnimation.restart();
            pulseAnimation.pause();
        }
    }).play();
}

/**
 * Handles keydown events for the viewport
 */
function handleKeyDown(e) {
    if (e.key === 'Escape') {
        hideYearViewport();
    }
}

/**
 * Removes the viewport completely
 */
export function destroyYearViewport() {
    if (viewportContainer) {
        // Kill any active animations
        if (pulseAnimation) {
            pulseAnimation.kill();
        }
        
        closeButton.removeEventListener('click', hideYearViewport);
        document.removeEventListener('keydown', handleKeyDown);
        document.body.removeChild(viewportContainer);
        
        // Reset all references
        viewportContainer = null;
        iframe = null;
        closeButton = null;
        headerElement = null;
        titleElement = null;
        starsContainer = null;
        pulseAnimation = null;
    }
}

/**
 * Loads the Year on Psyche section with a clickable button
 * @param {THREE.Scene} scene - The Three.js scene
 * @param {THREE.Camera} camera - The camera
 * @param {Array} sections - Array of section data
 */
export function loadSection4(scene, camera, sections, renderer) {
    // Create a button for the year viewport
//     const buttonGeometry = new THREE.BoxGeometry(40, 20, 5);
//     const buttonMaterial = new THREE.MeshBasicMaterial({
//         color: 0xf9a000, // Match year viewport color
//         transparent: false
//     });
//     yearButton = new THREE.Mesh(buttonGeometry, buttonMaterial);
//     yearButton.position.set(40, 60, -200); // Position from sections array
//     scene.add(yearButton);
    
//     // Create a text label for the button
//     const canvas = document.createElement('canvas');
//     canvas.width = 256;
//     canvas.height = 128;
//     const context = canvas.getContext('2d');
//     context.fillStyle = '#f9a000'; // Match year viewport color
//     context.fillRect(0, 0, canvas.width, canvas.height);
//     context.font = 'bold 24px Arial';
//     context.fillStyle = 'white';
//     context.textAlign = 'center';
//     context.textBaseline = 'middle';
//     context.fillText('Year on Psyche', canvas.width / 2, canvas.height / 2);
    
//     const texture = new THREE.CanvasTexture(canvas);
//     const labelMaterial = new THREE.MeshBasicMaterial({
//         map: texture,
//         transparent: true
//     });
//     const labelGeometry = new THREE.PlaneGeometry(50, 25);
//     yearLabel = new THREE.Mesh(labelGeometry, labelMaterial);
//     yearLabel.position.set(40, 60, -197); // Slightly in front of the button
//     scene.add(yearLabel);
    
//     // Add lights to enhance the section
//     const pointLight = new THREE.PointLight(0xffffff, 2, 200);
//     pointLight.position.set(40, 60, -190);
//     scene.add(pointLight);

//     // Make the button clickable
//     makeModelClickable(yearButton, () => {
//         showYearViewport();
//     });
    
//     // Make the label clickable too
//     makeModelClickable(yearLabel, () => {
//         showYearViewport();
//     });

//     // Add hover effect to the button
//     let isHovered = false;
//     yearButton.userData.onPointerOver = () => {
//         if (!isHovered) {
//             gsap.to(yearButton.material.color, {
//                 r: 0.976,  // #f9a000 darker
//                 g: 0.627,
//                 b: 0.0,
//                 duration: 0.3
//             });
//             isHovered = true;
//         }
//     };

//     yearButton.userData.onPointerOut = () => {
//         if (isHovered) {
//             gsap.to(yearButton.material.color, {
//                 r: 0.976,  // #f9a000
//                 g: 0.627,
//                 b: 0.0,
//                 duration: 0.3
//             });
//             isHovered = false;
//         }
//     };

//     // Mark these elements as part of section 4
//     yearButton.userData.section4Element = true;
//     yearLabel.userData.section4Element = true;
    
//     // Initially hide the button
//     yearButton.visible = false;
//     yearLabel.visible = false;

//******** NEW BUTTON ********* 
const section4Coords = sections[4]?.position;
if (!section4Coords) {
  console.error("Section 3 position not found.");
  return Promise.reject("Section 3 position not found.");
}

const buttonPos = {
  x: section4Coords.x,
  y: section4Coords.y + 2,
  z: section4Coords.z - 12,
};

const rotation = { x: 0.2, y: 0, z: 0 };

return new Promise((resolve, reject) => {
  try {
    const { buttonMesh } = triggerButton3D(
      "Explore the Cosmic Comparison between Earth and Psyche",
      buttonPos,
      rotation,
      0.7,
      scene,
      () => {
        showYearViewport();
        console.log("Cosmic Comparison button clicked.");
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
 * Renders the Year on Psyche section
 * @param {THREE.Camera} camera - The camera
 * @param {THREE.Scene} scene - The Three.js scene
 */
export function renderSection4(camera, scene) {
    //if (!yearButton) return;

    const currentSection = getCurrentSection();
    const isVisible = currentSection === 4;

    // // Show/hide the button based on current section
    // if (yearButton.visible !== isVisible) {
    //     yearButton.visible = isVisible;
    //     yearLabel.visible = isVisible;
        
        // Also show/hide any other elements in this section
        for (let i = 0; i < scene.children.length; i++) {
            const child = scene.children[i];
            if (child.userData && child.userData.section4Element) {
                child.visible = isVisible;
            }
        }
    //}

    // Removing this for now
    // // Auto-show viewport when entering section 4
    // if (isVisible && !hasShownViewport) {
    //     // Add a small delay to ensure the section transition is complete
    //     setTimeout(() => {
    //         showYearViewport();
    //         hasShownViewport = true;
    //     }, 1000);
    // } else if (!isVisible && hasShownViewport) {
    //     // Hide viewport when leaving section 4
    //     hideYearViewport();
    //     hasShownViewport = false;
    // }
}
