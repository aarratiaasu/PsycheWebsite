import * as THREE from 'three';
import { enableTextInteractivity } from './utils.js';
import { createStarfield, loadSun } from './starfield.js';
import gsap from 'gsap';
import { loadSection0 } from './section0.js';
import { loadSection1 } from './section1.js';
import { loadSection2 } from './section2.js';


function init() {

    // Section tracking and location presets
    let scrollProgress = 1;
    let currentSection = 1;
    const sections = [
        { x: 0, y: 100, z: -60 },    
        { x: 0, y: 0, z: 13 }, 
        { x: 60, y: -95, z: 20 }, 
        { x: 40, y: -60, z: -100 },    
        { x: 40, y: 60, z: -200 },    
        { x: 40, y: 100, z: -300 }    
    ];

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
    camera.position.set(0, 0, 13);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 0, 5);
    scene.add(directionalLight);

    // scroll control
    function onScroll(event) {
        scrollProgress += event.deltaY * 0.01; 
        scrollProgress = Math.max(0, Math.min(scrollProgress, sections.length - 1)); 

        const newSection = Math.round(scrollProgress);

        if (newSection !== currentSection) {
            currentSection = newSection;

            gsap.to(camera.position, {
                x: sections[currentSection].x,
                y: sections[currentSection].y,
                z: sections[currentSection].z,
                duration: 2,
                ease: "power2.inOut",
                onUpdate: () => {
                    camera.lookAt(getLookAtTarget(currentSection)); 
                }
            });

        }
    }
    window.addEventListener("wheel", onScroll);
    window.addEventListener("touchmove", onScroll);
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    //// ADD FRUSTUM TO LOAD ALL OBJECTS AT ONCE, THEN HIDE THEM UNTIL THEY ARE 
    //// CLOSE TO THE CAMERA'S FIELD OF VIEW

    /////////// DEBUG PANEL
    const debugPanel = document.getElementById('debug-panel');
    function updateDebugPanel() {
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
    enableTextInteractivity(camera, scene, renderer);
    const composer = loadSun(scene, renderer, camera);
    loadSection0(scene);
    loadSection1(scene, camera);
    createStarfield(scene);
    animate();
}

init();