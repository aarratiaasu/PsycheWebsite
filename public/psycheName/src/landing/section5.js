/**
 * Psyche Name Viewport Module
 *
 * This module handles loading the psycheName.html content in an iframe
 * that appears on top of the Three.js scene
 */
import * as THREE from 'three';
import { getCurrentSection } from './sectionTracking.js';
import { makeModelClickable } from './utils.js';
import gsap from 'gsap';
import { showNameViewport, hideNameViewport } from './psycheName.js';

let nameButton;
let hasShownViewport = false;

export function loadSection5(scene, camera) {
    // Create a button for the name
    const buttonGeometry = new THREE.BoxGeometry(40, 20, 5);
    const buttonMaterial = new THREE.MeshBasicMaterial({
        color: 0x45a049,
        transparent: false
    });
    nameButton = new THREE.Mesh(buttonGeometry, buttonMaterial);
    nameButton.position.set(40, -60, -360);
    scene.add(nameButton);
    
    // Create a text label for the button
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 128;
    const context = canvas.getContext('2d');
    context.fillStyle = '#45a049';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.font = 'bold 24px Arial';
    context.fillStyle = 'white';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('Name', canvas.width / 2, canvas.height / 2);
 //   context.fillText('Game', canvas.width / 2, canvas.height / 2);
    
    const texture = new THREE.CanvasTexture(canvas);
    const labelMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true
    });
    const labelGeometry = new THREE.PlaneGeometry(50, 25);
    const label = new THREE.Mesh(labelGeometry, labelMaterial);
    label.position.set(40, -60, -357); // Slightly in front of the button
    scene.add(label);
    
    // Add lights to enhance the section
    const pointLight = new THREE.PointLight(0xffffff, 2, 200);
    pointLight.position.set(40, -60, -350);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
     // Add directional light for better visibility
 //    const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
 //    directionalLight.position.set(0, 100, 0);
 //    scene.add(directionalLight);

    // Make the button clickable
    makeModelClickable(nameButton, () => {
        showNameViewport();
    });
    
    // Make the label clickable too
    makeModelClickable(label, () => {
        showNameViewport();
    });

    // Add hover effect to the button
    let isHovered = false;
    nameButton.userData.onPointerOver = () => {
        if (!isHovered) {
            gsap.to(nameButton.material.color, {
                r: 0.271,  // 0x45a049
                g: 0.627,
                b: 0.286,
                duration: 0.3
            });
            isHovered = true;
        }
    };

    nameButton.userData.onPointerOut = () => {
        if (isHovered) {
            gsap.to(nameButton.material.color, {
                r: 0.271,  // 0x45a049
                g: 0.627,
                b: 0.286,
                duration: 0.3
            });
            isHovered = false;
        }
    };

    nameButton.visible = false;
    label.visible =  false;


}
export function renderSection5(camera, scene) {
    if (!nameButton)
      //  console.log("nameButton is not defined");
        return;

    const currentSection = getCurrentSection();
    const isVisible = currentSection === 5;
  //  nameButton.visible = isVisible;
 
 
 // console.log(`Current Section: ${currentSection}, Should be visible: ${isVisible}`);


 //   nameButton.visible = isVisible;


    // Show/hide the button based on current section
    if (nameButton.visible !== isVisible) {
        nameButton.visible = isVisible;
        // Also show/hide any other elements in this section
        for (let i = 0; i < scene.children.length; i++) {
            const child = scene.children[i];
            if (child.userData && child.userData.section3Element) {
                child.visible = isVisible;
            }
        }
    }
// Auto-show viewport when entering section 3
if (isVisible && !hasShownViewport) {
    // Add a small delay to ensure the section transition is complete
    setTimeout(() => {
        showNameViewport();
        hasShownViewport = true;
    }, 500);
} else if (!isVisible && hasShownViewport) {
    // Hide viewport when leaving section 3
    hideNameViewport();
    hasShownViewport = false;
    }
}