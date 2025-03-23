/**
 * Section 8 - Space Pic
 */

import * as THREE from 'three';
import { getCurrentSection } from './sectionTracking.js';
import { makeModelClickable } from './utils.js';
import gsap from 'gsap';
import { showSpacePicViewport, hideSpacePicViewport } from '../../public/games/viewportspacepic.js';

let section8Elements = [];
let spacePicButton;
let hasShownViewport = false;

export function loadSection8(scene, camera) {
    // Create a button for the space pic feature
    const buttonGeometry = new THREE.BoxGeometry(40, 20, 5);
    const buttonMaterial = new THREE.MeshBasicMaterial({
        color: 0x007bff,
        transparent: false
    });
    spacePicButton = new THREE.Mesh(buttonGeometry, buttonMaterial);
    spacePicButton.position.set(200, 300, -110);
    spacePicButton.userData.section8Element = true;
    scene.add(spacePicButton);
    section8Elements.push(spacePicButton);
    
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
    label.userData.section8Element = true;
    scene.add(label);
    section8Elements.push(label);
    
    // Add lights to enhance the section
    const pointLight = new THREE.PointLight(0xffffff, 2, 200);
    pointLight.position.set(200, 300, -100);
    pointLight.userData.section8Element = true;
    scene.add(pointLight);
    section8Elements.push(pointLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    ambientLight.userData.section8Element = true;
    scene.add(ambientLight);
    section8Elements.push(ambientLight);

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

    // Initially hide all section 8 elements
    section8Elements.forEach(element => {
        element.visible = false;
    });
}

export function renderSection8(camera, scene) {
    if (section8Elements.length === 0) return;

    const currentSection = getCurrentSection();
    const isVisible = currentSection === 8;

    // Show/hide the elements based on current section
    section8Elements.forEach(element => {
        if (element.visible !== isVisible) {
            element.visible = isVisible;
        }
    });

    // Auto-show viewport when entering section 8
    if (isVisible && !hasShownViewport) {
        // Add a small delay to ensure the section transition is complete
        setTimeout(() => {
            showSpacePicViewport();
            hasShownViewport = true;
        }, 500);
    } else if (!isVisible && hasShownViewport) {
        // Hide viewport when leaving section 8
        hideSpacePicViewport();
        hasShownViewport = false;
    }
}
