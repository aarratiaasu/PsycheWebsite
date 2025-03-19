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

let starFieldCreated = false;
let sunCreated = false; 

export function changeBackground(type, scene, renderer, camera, updateComposer) {
    let newComposer = null; // To hold new composer if needed

    // Clear existing starfield and sun
    // Gets a bit wonky here and the stars and sun are hard to remove when trying
    // to load a new background. Removing user ability to swap for now. 
    if (starFieldCreated) {
        console.log('Removing starfield');
        scene.remove(starField);
        starField.geometry.dispose();
        starField.material.dispose();
        starField = null;
        console.log('Removing sun');
    }

    if (sunCreated) {
        console.log('Removing sun');
        scene.remove(sun);
        scene.remove(sunLight);
        sun.geometry.dispose();
        sun.material.dispose();
        sun = null;
        sunLight = null;
    }

 // Clear the background
 scene.background = null;

 switch (type) {
     case 'starfield':
         if (!starFieldCreated) {
             starField = createStarfield(scene);
             starFieldCreated = true;
         }
         const sunData = loadSun(scene, renderer, camera);
         sun = sunData.sun;
         sunLight = sunData.sunLight;
         newComposer = sunData.composer; // Use bloom composer
         break;

     case 'solidColor':
         scene.background = new THREE.Color('#592651');
         starFieldCreated = false; 
         break;
     
     case 'gradient':
         scene.background = new THREE.Color('#a53f5b');
         starFieldCreated = false; 
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
