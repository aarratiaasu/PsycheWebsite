/**
 * This file/code is not fully functional or fully implemented. 
 * It was intended to enable dynamic background switching to allow 
 * for aesthetic testing of different background styles.
 * 
 */

import * as THREE from 'three';
import { createStarfield, loadSun } from './starfield.js';

let starField = null;
let sun = null;
let sunLight = null;

export function changeBackground(type, scene, renderer, camera, updateComposer) {
    let newComposer = null; // To hold new composer if needed

    // Clear existing starfield and sun
    if (starField) {
        scene.remove(starField);
        starField.geometry.dispose();
        starField.material.dispose();
        starField = null;
    }
    if (sun) {
        scene.remove(sun);
        scene.remove(sunLight);
        sun.geometry.dispose();
        sun.material.dispose();
        sun = null;
        sunLight = null;
    }

    switch (type) {
        case 'starfield':
            starField = createStarfield(scene);
            const sunData = loadSun(scene, renderer, camera);
            sun = sunData.sun;
            sunLight = sunData.sunLight;
            newComposer = sunData.composer; // Use bloom composer
            scene.background = null;
            break;

        case 'solidColor':
            scene.background = new THREE.Color(0x1e1e1e);
            break;

        // Add more backgrounds as needed
    }

    // Update composer in landing.js
    updateComposer(newComposer);
}

export function initBackgroundSwitcher(scene, renderer, camera, updateComposer) {
    document.querySelectorAll('#background-menu li').forEach(item => {
        item.addEventListener('click', (e) => {
            const selected = e.target.getAttribute('data-value');
            console.log(`Background selected: ${selected}`);
            changeBackground(selected, scene, renderer, camera, updateComposer);
        });
    });
}
