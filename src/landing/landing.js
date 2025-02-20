import * as THREE from 'three';
import { enableTextInteractivity, enableModelClick } from './utils.js';
import { createStarfield, loadSun } from './starfield.js';
import { initSectionTracking, getCurrentSection } from './sectionTracking.js';
import { createNavMenu } from './nav.js';
import { loadSection0 } from './section0.js';
import { loadSection1 } from './section1.js';
import { loadSection2 } from './section2.js';
import { loadSection3 } from './section3.js';
import { loadSection4 } from './section4.js';

function init() {

    // Section tracking and location presets
    let scrollProgress = 1;
    let currentSection = 1;
    const sections = [
        { x: 0, y: 200, z: -60 },    
        { x: 0, y: 0, z: 13 }, 
        { x: 120, y: -60, z: 60 }, 
        { x: 40, y: -60, z: -260 },    
        { x: 40, y: 60, z: -200 },    
        { x: 40, y: 100, z: -300 },     
        { x: 20, y: 30, z: 10 },     
    ];

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
    camera.position.set(0, 0, 13);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('canvas-container').appendChild(renderer.domElement);
    createNavMenu(scene);
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 0, 5);
    scene.add(directionalLight);

    initSectionTracking(camera, sections, renderer);

/////////// DEBUG PANEL
    const debugPanel = document.getElementById('debug-panel');
    function updateDebugPanel() {
        const currentSection = getCurrentSection();
        debugPanel.innerHTML = `
            <strong>Current Section:</strong>
            ${currentSection}<br>
            <strong>Camera Position:</strong><br>
            X: ${camera.position.x.toFixed(2)}<br>
            Y: ${camera.position.y.toFixed(2)}<br>
            Z: ${camera.position.z.toFixed(2)}
        `;
    }
/////////// DEBUG PANEL

    function animate() {
        requestAnimationFrame(animate);
        updateDebugPanel();
        composer.render();
    }

    // Enable text interactivity before model loading
    enableTextInteractivity(camera, scene, renderer);

    const composer = loadSun(scene, renderer, camera);

    Promise.all([
        loadSection0(scene),
        loadSection1(scene, camera),
        loadSection2(scene, camera, sections),
        loadSection3(scene, camera),
        loadSection4(scene, camera)
    ]).then(() => {
        console.log("All sections loaded.");

        createStarfield(scene);
        enableModelClick(camera, renderer);

        animate();
    }).catch(error => {
        console.error("Error loading sections:", error);
    });
}

init();
