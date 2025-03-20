/**
 * Section 3 - Balance Game
 */

import * as THREE from 'three';
import { getCurrentSection } from './sectionTracking.js';
import { makeModelClickable } from './utils.js';
import gsap from 'gsap';
import { showBalanceViewport, hideBalanceViewport } from './balanceViewport.js';

let balanceButton;
let hasShownViewport = false;
export function loadSection3(scene, camera, sections) {
    const threeCoords = sections[3]?.position;


    // Create a button for the balance game
    const buttonGeometry = new THREE.BoxGeometry(40, 20, 5);
    const buttonMaterial = new THREE.MeshBasicMaterial({
        color: 0x45a049,
        transparent: false
    });
    balanceButton = new THREE.Mesh(buttonGeometry, buttonMaterial);
    balanceButton.position.set(threeCoords.x - 30, threeCoords.y + 30, threeCoords.z - 100);
    scene.add(balanceButton);
    
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
    context.fillText('Balance Game', canvas.width / 2, canvas.height / 2);
    
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
    makeModelClickable(balanceButton, () => {
        showBalanceViewport();
    });
    
    // Make the label clickable too
    makeModelClickable(label, () => {
        showBalanceViewport();
    });

    // Add hover effect to the button
    let isHovered = false;
    balanceButton.userData.onPointerOver = () => {
        if (!isHovered) {
            gsap.to(balanceButton.material.color, {
                r: 0.271,  // 0x45a049 darker
                g: 0.627,
                b: 0.286,
                duration: 0.3
            });
            isHovered = true;
        }
    };

    balanceButton.userData.onPointerOut = () => {
        if (isHovered) {
            gsap.to(balanceButton.material.color, {
                r: 0.271,  // 0x45a049
                g: 0.627,
                b: 0.286,
                duration: 0.3
            });
            isHovered = false;
        }
    };

    balanceButton.visible = false;
    label.visible = false;
}

export function renderSection3(camera, scene) {
    if (!balanceButton) return;

    const currentSection = getCurrentSection();
    const isVisible = currentSection === 3;

    // Show/hide the button based on current section
    if (balanceButton.visible !== isVisible) {
        balanceButton.visible = isVisible;
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
            showBalanceViewport();
            hasShownViewport = true;
        }, 1000);
    } else if (!isVisible && hasShownViewport) {
        // Hide viewport when leaving section 3
        hideBalanceViewport();
        hasShownViewport = false;
    }
}
