/*
 * File: section2.js
 * Purpose: Loads and initializes 3D text on the Psyche model section within the Three.js scene.
 * Author(s): 
 * Date: 20 FEB 2025
 * Version: 1.0
 *
 * Description:
 * Displays a more focused view of the Psyche asteroid model with a welcome text
 *
 * Functions:
 * - loadSection2(): Creates 3D text mesh to display a message
 */

import { createTextMesh, triggerButton3D, clickableModels, applyGlowEffect } from './utils.js';
import { showPsycheNameViewport } from './psycheNameViewport.js';
import * as THREE from 'three';
import gsap from 'gsap';

export function loadSection2(scene, camera, sections, renderer) {
  const section2Coords = sections[2]?.position;
  if (!section2Coords) {
    console.error("Section 2 position not found.");
    return Promise.reject("Section 2 position not found.");
  }

  const buttonPos = {
    x: section2Coords.x,
    y: section2Coords.y + 6,
    z: section2Coords.z - 12,
  };

  const rotation = { x: 0.2, y: 0, z: 0 };

  return new Promise((resolve, reject) => {
    try {
      const { buttonMesh } = triggerButton3D(
        "CLICK HERE TO LEARN HOW PSYCHE GOT ITS NAME!",
        buttonPos,
        rotation,
        0.7,
        scene,
        () => {
          showpsycheNameViewport();
          console.log("Origin button clicked.");
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
 * Creates and shows the name viewport
 */
export function showNameViewport() {
  // If viewport already exists, just show it
  if (viewportContainer) {
      viewportContainer.style.display = 'flex';
      return;
  }
  console.log("Creating Name viewport");
  // Create container for the viewport
  viewportContainer = document.createElement('div');
  viewportContainer.id = 'name-viewport-container';
  viewportContainer.style.position = 'fixed';
  viewportContainer.style.top = '50%';
  viewportContainer.style.left = '50%';
  viewportContainer.style.transform = 'translate(-50%, -50%)';
  viewportContainer.style.width = '80%'; // Increased from 90% to 110% (20% wider)
  viewportContainer.style.maxWidth = '1200px'; // Increased from 1200px to 1440px (20% wider)
  viewportContainer.style.height = '80vh'; // Increased from 85vh to 95vh (10% higher)
  viewportContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
  viewportContainer.style.border = '0.5px solid #FFFF';
  viewportContainer.style.borderRadius = '20px';
  viewportContainer.style.boxShadow = '0 0 30px rgba(0, 123, 255, 0.5)';
  viewportContainer.style.zIndex = '1000';
  viewportContainer.style.display = 'flex';
  viewportContainer.style.flexDirection = 'column';
  viewportContainer.style.overflow = 'hidden';
  // Create header with title and close button
  const header = document.createElement('div');
  header.style.display = 'flex';
  header.style.justifyContent = 'space-between';
  header.style.alignItems = 'center';
  header.style.padding = '1px 2px';
  header.style.backgroundColor = 'rbga(0, 0, 0, 0.3)';
  header.style.color = 'white';
  header.style.borderTopLeftRadius = '20px';
  header.style.borderTopRightRadius = '20px';
  const title = document.createElement('h2');
//    title.textContent = 'Psyche Name Origin';
//   title.style.margin = '0';
  title.style.fontSize = '1.2rem';
  closeButton = document.createElement('button');
  closeButton.textContent = '✕';
  closeButton.style.background = 'none';
  closeButton.style.border = 'none';
  closeButton.style.color = 'white';
  closeButton.style.fontSize = '1.5rem';
  closeButton.style.cursor = 'pointer';
  closeButton.style.padding = '0 5px';
  closeButton.style.lineHeight = '1';
//   header.appendChild(title);
  header.appendChild(closeButton);
  viewportContainer.appendChild(header);
  // Create iframe to load the balance.html content
  iframe = document.createElement('iframe');
  iframe.src = './name/psycheName.html';
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.border = 'none';
  iframe.style.backgroundColor = '#222';
  // Add event listener for iframe load errors
  iframe.onerror = () => {
      console.error("Failed to load iframe content");
  };
  // Add event listener for iframe load success
  iframe.onload = () => {
      console.log("Iframe loaded successfully");
  };
  viewportContainer.appendChild(iframe);
  document.body.appendChild(viewportContainer);
  // Add animation for opening
  gsap.from(viewportContainer, {
      opacity: 0,
      scale: 0.8,
      duration: 0.4,
      ease: "power2.out"
  });
  // Add event listener for close button
  closeButton.addEventListener('click', hideNameViewport);
  // Add event listener for Escape key
  document.addEventListener('keydown', handleKeyDown);
}
document.addEventListener("DOMContentLoaded", function () {
  let contentBox = document.getElementById("content");
  let popup = document.getElementById("viewportContainer");
  let closeButton = document.getElementById("closeButton");

  if (!popup || !contentBox || !closeButton) {
      console.error("Missing elements: viewportContainer, content, or closeButton.");
      return;
  }
  // Content for each section
  const sections = {
      introLink: "<h2>Introduction</h2><p>Psyche is a metal-rich asteroid orbiting the Sun between Mars and Jupiter. It was named after the Greek goddess Psyche.</p>",
      historyLink: "<h2>Historical Background</h2><p>Psyche was discovered in 1852 by Italian astronomer Annibale de Gasparis and is one of the largest asteroids in our solar system.</p>",
      missionLink: "<h2>NASA's Psyche Mission</h2><p>The Psyche spacecraft, designed by NASA, aims to study the asteroid to understand more about planetary cores and the history of the solar system.</p>",
      funFactsLink: "<h2>Fun Facts</h2></h2></h2><ul><li>Psyche is primarily composed of nickel and iron, much like Earth's core.</li><li>It is about 226 kilometers (140 miles) in diameter.</li><li>Its name means 'soul' in Greek mythology.</li></ul>"
  };

  // Show popup when clicking a link
  document.querySelectorAll("ul li a").forEach(link => {
      link.addEventListener("click", function () {
          let sectionKey = this.id;
          contentBox.innerHTML = sections[sectionKey] || "No content available.";
          popup.style.display = "block";
          gsap.from(popup, {
              opacity: 0,
              scale: 0.8,
              duration: 0.4,
              ease: "power2.out"
          });
      });
  });

  // Close popup
  closeButton.addEventListener("click", hideNameViewport); 

  // Close popup when clicking outside of it
  window.addEventListener("click", function (e) {
      if (e.target === popup) {
          hideNameViewport();
      }
  });
});
/**
* Hides the name viewport
*/
export function hideNameViewport() {
  if (!viewportContainer) return;
//    viewportContainer.style.button = "-100%";
//    viewportContainer.style.opacity = "0";

//    setTimeout(() => {
//        document.body.removeChild(viewportContainer);
//        viewportContainer = null;
//        iframe = null;
//        closeButton = null;
//    }, 500);
//    };
  // Animate closing
  gsap.to(viewportContainer, {
      opacity: 0,
     scale: 0.8,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
          viewportContainer.style.display = 'none';
          // Reset opacity and scale for next time
          viewportContainer.style.opacity = 1;
          viewportContainer.style.transform = 'translate(-50%, -50%) scale(1)';
      }
  });
}
/**
* Handles keydown events for the viewport
*/
function handleKeyDown(e) {
  if (e.key === 'Escape') {
      hideNameViewport();
  }
}
/**
* Removes the viewport completely
*/
export function destroyNameViewport() {
  if (viewportContainer) {
      closeButton.removeEventListener('click', hideNameViewport);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.removeChild(viewportContainer);
      viewportContainer = null;
      iframe = null;
      closeButton = null;
  }
}

