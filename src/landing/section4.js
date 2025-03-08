/**
 * Section 4 - Year Metrics
 */

import * as THREE from 'three';
import { getCurrentSection } from './sectionTracking.js';
import { makeModelClickable } from './utils.js';
import gsap from 'gsap';
import { showYearViewport, hideYearViewport } from './year.js';

let yearButton;
let label;
let hasShownViewport = false;

export function loadSection4(scene, camera) {
    // Create a button for the year metrics
    const buttonGeometry = new THREE.BoxGeometry(40, 20, 5);
    const buttonMaterial = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0
    });
    yearButton = new THREE.Mesh(buttonGeometry, buttonMaterial);
    yearButton.position.set(40, -60, -560);
    scene.add(yearButton);
    
    // Create a text label for the button
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 128;
    const context = canvas.getContext('2d');
    //context.fillStyle = '#45a049';
    //context.fillRect(0, 0, canvas.width, canvas.height);
    context.font = 'bold 24px Arial';
    context.fillStyle = 'white';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('Living on Psyche', canvas.width / 2, canvas.height / 2);
    
    const texture = new THREE.CanvasTexture(canvas);
    const labelMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true
    });
    const labelGeometry = new THREE.PlaneGeometry(50, 25);
    const label = new THREE.Mesh(labelGeometry, labelMaterial);
    label.position.set(40, 60, -260); // Slightly in front of the button
    label.userData.section4Element = true; // Mark as part of section 4
    scene.add(label);
    
    // Add lights to enhance the section
    const pointLight = new THREE.PointLight(0xffffff, 2, 200);
    pointLight.position.set(40, 60, -220);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Make the button clickable
    makeModelClickable(yearButton, () => {
        showYearViewport();
    });
    
    // Make the label clickable 
    makeModelClickable(label, () => {
        showYearViewport();
    });

// Ensure the button is interactive
yearButton.userData.interactive = true;

// // Add hover effect to the button
// let isHovered = false;
// yearButton.userData.onPointerOver = () => {
//     if (!isHovered) {
//         gsap.to(yearButton.material.color, {
//             r: 0.271,  // 0x45a049 darker
//             g: 0.627,
//             b: 0.286,
//             duration: 0.3,
//             onUpdate: function() {
//                 yearButton.material.color.setRGB(this.r, this.g, this.b);
//             }
//         });
//         isHovered = true;
//     }
// };

// yearButton.userData.onPointerOut = () => {
//     if (isHovered) {
//         gsap.to(yearButton.material.color, {
//             r: 0.976,  
//             g: 0.627,
//             b: 0.0,
//             duration: 0.3,
//             onUpdate: function() {
//                 yearButton.material.color.setRGB(this.r, this.g, this.b);
//             }
//         });
//         isHovered = false;
//     }
// };

// Add hover effect to the label
label.userData.onPointerOver = () => {
    gsap.to(label.material.color, {
        r: 0.976,  
        g: 0.627,
        b: 0.0,
        duration: 0.3,
        onUpdate: function() {
            label.material.color.setRGB(this.r, this.g, this.b);
        }
    });
};

label.userData.onPointerOut = () => {
    gsap.to(label.material.color, {
        r: 1,  
        g: 1,
        b: 1,
        duration: 0.3,
        onUpdate: function() {
            label.material.color.setRGB(this.r, this.g, this.b);
        }
    });
};

    yearButton.visible = false;
    label.visible = false;
}

export function renderSection4(camera, scene) {
    if (!yearButton) return;

    const currentSection = getCurrentSection();
    const isVisible = (currentSection === 4);

    // Show/hide the button based on current section
    if (yearButton.visible !== isVisible) {
        yearButton.visible = isVisible;
        // Also show/hide any other elements in this section
        for (let i = 0; i < scene.children.length; i++) {
            const child = scene.children[i];
            if (child.userData && child.userData.section4Element) {
                child.visible = isVisible;
            }
        }
    }
    // Removing this feature for now. 
    // // Auto-show viewport when entering section 4
    // if (isVisible && !hasShownViewport) {
    //     // Add a small delay to ensure the section transition is complete
    //     setTimeout(() => {
    //         showYearViewport();
    //         hasShownViewport = true;
    //     }, 500);
    // } else if (!isVisible && hasShownViewport) {
    //     // Hide viewport when leaving section 3
    //     hideYearViewport();
    //     hasShownViewport = false;
    // }
}