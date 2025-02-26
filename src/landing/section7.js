/**
 * Section 7 - Space Pic
 */

import * as THREE from 'three';
import { getCurrentSection } from './sectionTracking.js';
import { makeModelClickable } from './utils.js';
import gsap from 'gsap';
import { showSpacePicViewport, hideSpacePicViewport } from './viewportspacepic.js';

let spacePicButton;
let hasShownViewport = false;

export function loadSection7(scene, camera) {
    // Create a button for the space pic feature
    const buttonGeometry = new THREE.BoxGeometry(40, 20, 5);
    const buttonMaterial = new THREE.MeshBasicMaterial({
        color: 0x007bff,
        transparent: false
    });
    spacePicButton = new THREE.Mesh(buttonGeometry, buttonMaterial);
    spacePicButton.position.set(200, 300, -110);
    scene.add(spacePicButton);
    
    // Create a text label for the button
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 128;
    const context = canvas.getContext('2d');
    context.fillStyle = '#007bff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.font = 'bold 24px Arial';
    context.fillStyle = 'white';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('Space Pic', canvas.width / 2, canvas.height / 2);
    
    const texture = new THREE.CanvasTexture(canvas);
    const labelMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true
    });
    const labelGeometry = new THREE.PlaneGeometry(50, 25);
    const label = new THREE.Mesh(labelGeometry, labelMaterial);
    label.position.set(200, 300, -107); // Slightly in front of the button
    scene.add(label);
    
    // Add lights to enhance the section
    const pointLight = new THREE.PointLight(0xffffff, 2, 200);
    pointLight.position.set(200, 300, -100);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Make the button clickable
    makeModelClickable(spacePicButton, () => {
        showSpacePicViewport();
    });
    
    // Make the label clickable too
    makeModelClickable(label, () => {
        showSpacePicViewport();
    });

    // Add hover effect to the button
    let isHovered = false;
    spacePicButton.userData.onPointerOver = () => {
        if (!isHovered) {
            gsap.to(spacePicButton.material.color, {
                r: 0,      // #0056b3 darker
                g: 0.337,
                b: 0.702,
                duration: 0.3
            });
            isHovered = true;
        }
    };

    spacePicButton.userData.onPointerOut = () => {
        if (isHovered) {
            gsap.to(spacePicButton.material.color, {
                r: 0,      // #007bff
                g: 0.482,
                b: 1,
                duration: 0.3
            });
            isHovered = false;
        }
    };

    spacePicButton.visible = false;
    label.visible = false;
}

export function renderSection7(camera, scene) {
    if (!spacePicButton) return;

    const currentSection = getCurrentSection();
    const isVisible = currentSection === 7;

    // Show/hide the button based on current section
    if (spacePicButton.visible !== isVisible) {
        spacePicButton.visible = isVisible;
        // Also show/hide any other elements in this section
        for (let i = 0; i < scene.children.length; i++) {
            const child = scene.children[i];
            if (child.userData && child.userData.section7Element) {
                child.visible = isVisible;
            }
        }
    }

    // Auto-show viewport when entering section 7
    if (isVisible && !hasShownViewport) {
        // Add a small delay to ensure the section transition is complete
        setTimeout(() => {
            showSpacePicViewport();
            hasShownViewport = true;
        }, 500);
    } else if (!isVisible && hasShownViewport) {
        // Hide viewport when leaving section 7
        hideSpacePicViewport();
        hasShownViewport = false;
    }
}
