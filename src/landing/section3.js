/**
 * Section 3 - Balance Game Link
 */

import * as THREE from 'three';
import { getCurrentSection } from './sectionTracking.js';
import { makeModelClickable } from './utils.js';
import gsap from 'gsap';

let frameMesh;

export function loadSection3(scene, camera) {
    // Create a frame with text
    const frameGeometry = new THREE.BoxGeometry(85, 65, 2);
    const frameMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x4CAF50,
        specular: 0x050505,
        shininess: 100
    });
    frameMesh = new THREE.Mesh(frameGeometry, frameMaterial);

    // Add text
    const loader = new THREE.TextureLoader();
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 512;
    canvas.height = 512;
    context.fillStyle = '#ffffff';
    context.font = 'bold 40px Arial';
    context.textAlign = 'center';
    context.fillText('Balance', canvas.width/2, canvas.height/2 - 20);
    context.font = '30px Arial';
    context.fillText('Game', canvas.width/2, canvas.height/2 + 20);
    
    const texture = new THREE.CanvasTexture(canvas);
    const textMaterial = new THREE.MeshBasicMaterial({ 
        map: texture,
        transparent: true,
        side: THREE.DoubleSide
    });
    
    const textGeometry = new THREE.PlaneGeometry(80, 60);
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.z = 1.1;
    
    frameMesh.add(textMesh);
    frameMesh.position.set(40, -60, -600);
    scene.add(frameMesh);

    // Add lights to make the frame pop
    const pointLight = new THREE.PointLight(0xffffff, 2, 200);
    pointLight.position.set(40, -60, -550);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add directional light for better visibility
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(40, -60, -500);
    scene.add(directionalLight);

    // Make the frame clickable
    makeModelClickable(frameMesh, () => {
        window.location.href = './balance/balance.html';
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
