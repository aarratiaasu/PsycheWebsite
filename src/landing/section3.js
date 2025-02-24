/**
 * Section 3 - Balance Game Link
 */

import * as THREE from 'three';
import { getCurrentSection } from './sectionTracking.js';
import { makeModelClickable } from './utils.js';
import gsap from 'gsap';

let frameMesh;

export function loadSection3(scene, camera) {
    // Load the balance game preview image and use it as the main texture
    const loader = new THREE.TextureLoader();
    const previewTexture = loader.load('./img/balance-preview.png');
    // Create a plane that uses the preview image as its material
    const previewGeometry = new THREE.PlaneGeometry(85, 65);
    const previewMaterial = new THREE.MeshBasicMaterial({
        map: previewTexture,
        transparent: true
    });
    frameMesh = new THREE.Mesh(previewGeometry, previewMaterial);
    frameMesh.position.set(40, -60, -600);
    scene.add(frameMesh);

    // Add lights to enhance the scene
    const pointLight = new THREE.PointLight(0xffffff, 2, 200);
    pointLight.position.set(40, -60, -550);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(40, -60, -500);
    scene.add(directionalLight);

    // Make the frame clickable - animate then navigate directly to balance.html
    makeModelClickable(frameMesh, () => {
        gsap.to(frameMesh.position, {
            z: -1000,
            duration: 1,
            ease: "power2.in",
            onComplete: () => window.location.href = './balance/balance.html'
        });
    });

    // Add hover effect
    let isHovered = false;
    frameMesh.userData.onPointerOver = () => {
        if (!isHovered) {
            gsap.to(frameMesh.material.color, {
                r: 0.271,  // 0x45a049
                g: 0.627,
                b: 0.286,
                duration: 0.3
            });
            isHovered = true;
        }
    };

    frameMesh.userData.onPointerOut = () => {
        if (isHovered) {
            gsap.to(frameMesh.material.color, {
                r: 0.298,  // 0x4CAF50
                g: 0.686,
                b: 0.314,
                duration: 0.3
            });
            isHovered = false;
        }
    };

    frameMesh.visible = false;
}

export function renderSection3(camera, scene) {
    if (!frameMesh) return;

    const currentSection = getCurrentSection();
    const isVisible = currentSection === 3;

    frameMesh.visible = isVisible;

    if (isVisible && !frameMesh.userData.hasAnimated) {
        gsap.to(frameMesh.position, {
            z: -360,
            duration: 1.2,
            ease: "power2.out"
        });

        frameMesh.userData.hasAnimated = true;
    }
}

// If on the balance game page, add a listener for the Escape key to navigate back to the main page.
if (window.location.href.indexOf('balance.html') !== -1) {
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            window.location.href = './index.html';
        }
    });
}
