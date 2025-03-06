/**
 * Section 3 - Life on Psyche
 */

import * as THREE from 'three';
import { getCurrentSection } from './sectionTracking.js';
import { makeModelClickable } from './utils.js';
import gsap from 'gsap';
import { showYearViewport, hideYearViewport } from './year.js';

let yearButton;
let hasShownViewport = false;

export function loadSection3(scene, camera) {
    // Create a button for the year viewport
    const buttonGeometry = new THREE.BoxGeometry(40, 20, 5);
    const buttonMaterial = new THREE.MeshBasicMaterial({
        color: 0xf9a000, // Changed to match year viewport color
        transparent: false
    });
    yearButton = new THREE.Mesh(buttonGeometry, buttonMaterial);
    yearButton.position.set(40, -60, -360);
    scene.add(yearButton);
    
    // Create a text label for the button
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 128;
    const context = canvas.getContext('2d');
    context.fillStyle = '#f9a000'; // Changed to match year viewport color
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.font = 'bold 24px Arial';
    context.fillStyle = 'white';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('Life on Psyche', canvas.width / 2, canvas.height / 2);
    
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

    // Make the button clickable
    makeModelClickable(yearButton, () => {
        showYearViewport();
    });
    
    // Make the label clickable too
    makeModelClickable(label, () => {
        showYearViewport();
    });

    // Add hover effect to the button
    let isHovered = false;
    yearButton.userData.onPointerOver = () => {
        if (!isHovered) {
            gsap.to(yearButton.material.color, {
                r: 0.976,  // #f9a000 darker
                g: 0.627,
                b: 0.0,
                duration: 0.3
            });
            isHovered = true;
        }
    };

    yearButton.userData.onPointerOut = () => {
        if (isHovered) {
            gsap.to(yearButton.material.color, {
                r: 0.976,  // #f9a000
                g: 0.627,
                b: 0.0,
                duration: 0.3
            });
            isHovered = false;
        }
    };

    yearButton.visible = false;
    label.visible = false;
}

export function renderSection3(camera, scene) {
    if (!yearButton) return;

    const currentSection = getCurrentSection();
    const isVisible = currentSection === 3;

    // Show/hide the button based on current section
    if (yearButton.visible !== isVisible) {
        yearButton.visible = isVisible;
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
            showYearViewport();
            hasShownViewport = true;
        }, 500);
    } else if (!isVisible && hasShownViewport) {
        // Hide viewport when leaving section 3
        hideYearViewport();
        hasShownViewport = false;
    }
}
