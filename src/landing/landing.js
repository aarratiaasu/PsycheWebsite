import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createNebula } from './neb_shader.js';
import gsap from 'gsap';

let textMesh = null;
let model = null;

// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0,0,13); // Default position, adjust later
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Controls (Allow Manual Camera Movement)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Smooth movement
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 0, 5);
scene.add(directionalLight);

// Load 3D Text (Reset Position & Rotation)
const fontLoader = new FontLoader();
fontLoader.load('/res/font/DroidSans_Regular.json', (font) => {
    const textGeometry = new TextGeometry('YEAR ON PSYCHE', {
        font: font,
        size: 1,
        depth: 0.3,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5
    });

    // Create a gradient shader for the text
    const textMaterial = new THREE.ShaderMaterial({
        uniforms: {
            color1: { value: new THREE.Color(90/255, 39/255, 82/255) },   // #5a2752
            color2: { value: new THREE.Color(49/255, 33/255, 70/255) },   // #312146
            color3: { value: new THREE.Color(164/255, 64/255, 92/255) },  // #a4405c
            color4: { value: new THREE.Color(239/255, 89/255, 101/255) }, // #ef5965
            color5: { value: new THREE.Color(245/255, 124/255, 51/255) }, // #f57c33
            color6: { value: new THREE.Color(249/255, 159/255, 0/255) },  // #f99f00
        },
        vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv; // Pass UV coordinates to fragment shader
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            varying vec2 vUv;
            uniform vec3 color1;
            uniform vec3 color2;
            uniform vec3 color3;
            uniform vec3 color4;
            uniform vec3 color5;
            uniform vec3 color6;

            void main() {
                vec3 gradient;
                if (vUv.y < 0.2) {
                    gradient = mix(color1, color2, vUv.y / 0.2);
                } else if (vUv.y < 0.4) {
                    gradient = mix(color2, color3, (vUv.y - 0.2) / 0.2);
                } else if (vUv.y < 0.6) {
                    gradient = mix(color3, color4, (vUv.y - 0.4) / 0.2);
                } else if (vUv.y < 0.8) {
                    gradient = mix(color4, color5, (vUv.y - 0.6) / 0.2);
                } else {
                    gradient = mix(color5, color6, (vUv.y - 0.8) / 0.2);
                }

                gl_FragColor = vec4(gradient, 1.0);
            }
        `,
    });

    textMesh = new THREE.Mesh(textGeometry, textMaterial);

    // Set Position & Rotation
    textMesh.position.set(-12, 3, 0);
    textMesh.rotation.set(0, Math.PI / 12, 0);

    scene.add(textMesh);
});



// Load the GLB Model
const loader = new GLTFLoader();

loader.load('/res/models/16psyche.glb', (gltf) => {
    const model = gltf.scene;

    // Set initial position (off-screen to the right)
    model.position.set(20, 12, -10); // Start outside viewport (X=right, Y=above, Z=back)

    // Scale model (adjust if needed)
    model.scale.set(2, 2, 2); 

    scene.add(model);

    // Animate model into the scene
    gsap.to(model.position, {
        x: 10,   // Move into the top-right corner
        y: 6,   // Slightly above center
        z: -2,  // Closer to the camera
        duration: 3,
        ease: "power2.out"
    });
    gsap.to(model.rotation, {
        y: "-=6.28319", 
        z: "+=6.28319", 
        duration: 45,
        ease: "linear",
        repeat: -1 // Keep it rotating forever
    })
}, undefined, (error) => {
    console.error("Error loading model:", error);
});


// Debug Panel Update
const debugPanel = document.getElementById('debug-panel');
function updateDebugPanel() {
    debugPanel.innerHTML = `
        <strong>Camera Position:</strong><br>
        X: ${camera.position.x.toFixed(2)}<br>
        Y: ${camera.position.y.toFixed(2)}<br>
        Z: ${camera.position.z.toFixed(2)}<br>
        <br>
        <strong>Camera Rotation:</strong><br>
        X: ${camera.rotation.x.toFixed(2)}<br>
        Y: ${camera.rotation.y.toFixed(2)}<br>
        Z: ${camera.rotation.z.toFixed(2)}
    `;
}

let controlsEnabled = true; // Track OrbitControls state

window.addEventListener('keydown', (event) => {
    if (event.key === 't') { // Press 'T' to toggle
        controlsEnabled = !controlsEnabled;
        controls.enabled = controlsEnabled;
        console.log(`OrbitControls ${controlsEnabled ? 'ON' : 'OFF'}`);
    }
});

// Handle Window Resize
window.addEventListener('resize', () => {
    const aspect = window.innerWidth / window.innerHeight;
    camera.aspect = aspect;
    
    // Adjust FOV for better scaling
    camera.fov = 75 + (aspect < 1 ? 20 : 0);
    camera.updateProjectionMatrix();

    // Adjust objects dynamically if they exist
    if (textMesh) textMesh.position.x = -10 * aspect;
    if (model) model.position.x = 10 * aspect;

    renderer.setSize(window.innerWidth, window.innerHeight);
});



// Render Loop
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Keep controls smooth
    updateDebugPanel(); // Update coordinates
    renderer.render(scene, camera);
}
animate();
