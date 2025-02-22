/**
 * THIS SECTION WAS A QUICK ATTEMPT TO GET ARMANDO'S BALANCE GAME TO WORK INSIDE THE SCENE
 */

import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import { getCurrentSection } from './sectionTracking.js';
import gsap from 'gsap';

let cssRenderer, frameMesh, balanceObject;

export function loadSection3(scene, camera) {
    cssRenderer = new CSS3DRenderer();
    cssRenderer.setSize(window.innerWidth, window.innerHeight);
    cssRenderer.domElement.style.position = 'absolute';
    cssRenderer.domElement.style.top = 0;
    cssRenderer.domElement.style.pointerEvents = 'none';
    document.body.appendChild(cssRenderer.domElement);

    const frameGeometry = new THREE.BoxGeometry(85, 65, 2);
    const frameMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa, metalness: 0.5, roughness: 0.5 });
    frameMesh = new THREE.Mesh(frameGeometry, frameMaterial);

    frameMesh.position.set(40, -60, -600);
    scene.add(frameMesh);

    const balanceIframe = document.createElement('iframe');
    balanceIframe.src = './balance/balance.html';
    balanceIframe.width = '800';
    balanceIframe.height = '600';
    balanceIframe.style.border = 'none';
    balanceIframe.style.pointerEvents = 'auto';

    balanceObject = new CSS3DObject(balanceIframe);
    balanceObject.position.set(40, -60, -600);
    balanceObject.scale.set(0.1, 0.1, 0.1);
    scene.add(balanceObject);

    frameMesh.visible = false;
    balanceObject.visible = false;
}

export function renderSection3(camera, scene) {
    if (!cssRenderer || !balanceObject) return;

    const currentSection = getCurrentSection();
    const isVisible = currentSection === 3;

    frameMesh.visible = isVisible;
    balanceObject.visible = isVisible;

    if (isVisible && !frameMesh.userData.hasAnimated) {
        gsap.to(frameMesh.position, {
            z: -360,
            duration: 1.2,
            ease: "power2.out"
        });

        gsap.to(balanceObject.position, {
            z: -360,
            duration: 1.2,
            ease: "power2.out"
        });

        frameMesh.userData.hasAnimated = true;
    }

    cssRenderer.render(scene, camera);
}
