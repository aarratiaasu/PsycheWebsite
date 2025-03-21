/**
 * Section 3 - PsycheJR
 * 
 * This section handles the PsycheJR button and viewport integration.
 * Updated to support responsive design from 768px to 2560px.
 */

import * as THREE from 'three';
import { getCurrentSection } from './sectionTracking.js';
import { makeModelClickable } from './utils.js';
import gsap from 'gsap';
import { showKidsViewport, hideKidsViewport } from '../../public/PsycheJR/kidsViewport.js';

let yearButton;
let buttonLabel;
let hasShownViewport = false;
let resizeHandler;

/**
 * Calculate responsive positioning based on screen width
 * @returns {Object} Position and scale values
 */
function calculateResponsiveValues() {
    const screenWidth = window.innerWidth;
    let posX = 40;
    let posY = -60;
    let posZ = -360;
    let buttonScale = 1;
    let labelScale = 1;
    
    // Adjust position and scale based on screen width
    if (screenWidth >= 2000) {
        // Extra large screens (2000px-2560px)
        buttonScale = 1.3;
        labelScale = 1.3;
        posX = 50;
    } else if (screenWidth >= 1600) {
        // Very large screens (1600px-2000px)
        buttonScale = 1.2;
        labelScale = 1.2;
        posX = 45;
    } else if (screenWidth >= 1200) {
        // Large screens (1200px-1600px)
        buttonScale = 1.1;
        labelScale = 1.1;
        posX = 42;
    } else if (screenWidth >= 992) {
        // Medium-large screens (992px-1200px)
        buttonScale = 1;
        labelScale = 1;
    } else if (screenWidth >= 768) {
        // Medium screens (tablets) (768px-992px)
        buttonScale = 0.9;
        labelScale = 0.9;
        posX = 38;
    } else {
        // Small screens (phones) (<768px)
        buttonScale = 0.8;
        labelScale = 0.8;
        posX = 35;
    }
    
    return { posX, posY, posZ, buttonScale, labelScale };
}

export function loadSection3(scene, camera) {
    // Create a button for the year viewport
    const buttonGeometry = new THREE.BoxGeometry(40, 20, 5);
    const buttonMaterial = new THREE.MeshBasicMaterial({
        color: 0xf9a000, // Changed to match year viewport color
        transparent: false
    });
    yearButton = new THREE.Mesh(buttonGeometry, buttonMaterial);
    
    // Get responsive values
    const { posX, posY, posZ, buttonScale, labelScale } = calculateResponsiveValues();
    
    // Set initial position and scale
    yearButton.position.set(posX, posY, posZ);
    yearButton.scale.set(buttonScale, buttonScale, buttonScale);
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
    context.fillText('PsycheJR', canvas.width / 2, canvas.height / 2);
    
    const texture = new THREE.CanvasTexture(canvas);
    const labelMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true
    });
    const labelGeometry = new THREE.PlaneGeometry(50, 25);
    buttonLabel = new THREE.Mesh(labelGeometry, labelMaterial);
    buttonLabel.position.set(posX, posY, posZ - 3); // Slightly in front of the button
    buttonLabel.scale.set(labelScale, labelScale, labelScale);
    scene.add(buttonLabel);
    
    // Add lights to enhance the section
    const pointLight = new THREE.PointLight(0xffffff, 2, 200);
    pointLight.position.set(40, -60, -350);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Make the button clickable
    makeModelClickable(yearButton, () => {
        showKidsViewport();
    });
    
    // Make the label clickable too
    makeModelClickable(buttonLabel, () => {
        showKidsViewport();
    });
    
    // Add window resize handler
    resizeHandler = () => {
        if (!yearButton || !buttonLabel) return;
        
        const { posX, posY, posZ, buttonScale, labelScale } = calculateResponsiveValues();
        
        // Update button position and scale
        yearButton.position.set(posX, posY, posZ);
        yearButton.scale.set(buttonScale, buttonScale, buttonScale);
        
        // Update label position and scale
        buttonLabel.position.set(posX, posY, posZ - 3);
        buttonLabel.scale.set(labelScale, labelScale, labelScale);
    };
    
    window.addEventListener('resize', resizeHandler);

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
    buttonLabel.visible = false;
}

export function renderSection3(camera, scene) {
    if (!yearButton || !buttonLabel) return;

    const currentSection = getCurrentSection();
    const isVisible = currentSection === 3;

    // Show/hide the button based on current section
    if (yearButton.visible !== isVisible) {
        yearButton.visible = isVisible;
        buttonLabel.visible = isVisible;
        
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
            showKidsViewport();
            hasShownViewport = true;
        }, 1000);
    } else if (!isVisible && hasShownViewport) {
        // Hide viewport when leaving section 3
        hideKidsViewport();
        hasShownViewport = false;
    }
}

/**
 * Clean up event listeners when section is no longer needed
 */
export function cleanupSection3() {
    if (resizeHandler) {
        window.removeEventListener('resize', resizeHandler);
        resizeHandler = null;
    }
}
