/**
 * Section 8 - New Section
 */

import * as THREE from 'three';
import { getCurrentSection } from './sectionTracking.js';
import { makeModelClickable } from './utils.js';
import gsap from 'gsap';

let section8Elements = [];

export function loadSection8(scene, camera) {
    // Create a main element for section 8
    const boxGeometry = new THREE.BoxGeometry(40, 40, 5);
    const boxMaterial = new THREE.MeshBasicMaterial({
        color: 0x00cc88,
        transparent: false
    });
    const mainBox = new THREE.Mesh(boxGeometry, boxMaterial);
    mainBox.position.set(250, 250, -150);
    mainBox.userData.section8Element = true;
    scene.add(mainBox);
    section8Elements.push(mainBox);
    
    // Create a text label
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 128;
    const context = canvas.getContext('2d');
    context.fillStyle = '#00cc88';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.font = 'bold 24px Arial';
    context.fillStyle = 'white';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('Section 8', canvas.width / 2, canvas.height / 2);
    
    const texture = new THREE.CanvasTexture(canvas);
    const labelMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true
    });
    const labelGeometry = new THREE.PlaneGeometry(50, 25);
    const label = new THREE.Mesh(labelGeometry, labelMaterial);
    label.position.set(250, 250, -147); // Slightly in front of the box
    label.userData.section8Element = true;
    scene.add(label);
    section8Elements.push(label);
    
    // Add lights to enhance the section
    const pointLight = new THREE.PointLight(0xffffff, 2, 200);
    pointLight.position.set(250, 250, -140);
    pointLight.userData.section8Element = true;
    scene.add(pointLight);
    section8Elements.push(pointLight);

    // Add hover effect to the main box
    let isHovered = false;
    mainBox.userData.onPointerOver = () => {
        if (!isHovered) {
            gsap.to(mainBox.material.color, {
                r: 0,
                g: 0.7,
                b: 0.5,
                duration: 0.3
            });
            isHovered = true;
        }
    };

    mainBox.userData.onPointerOut = () => {
        if (isHovered) {
            gsap.to(mainBox.material.color, {
                r: 0,
                g: 0.8,
                b: 0.533,
                duration: 0.3
            });
            isHovered = false;
        }
    };

    // Make the box clickable
    makeModelClickable(mainBox, () => {
        console.log("Section 8 box clicked!");
        // Add your click action here
    });
    
    // Make the label clickable too
    makeModelClickable(label, () => {
        console.log("Section 8 label clicked!");
        // Add your click action here
    });

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
}
