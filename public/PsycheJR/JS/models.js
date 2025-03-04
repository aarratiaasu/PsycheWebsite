import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

const container = document.getElementById('psyche-container');

// Scene and Renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000);

const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.set(0, 1, 5);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Lights
const light = new THREE.DirectionalLight(0x7a5f3e, 1);
light.position.set(5, 5, 5).normalize();
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040, 1); // Soft ambient light
scene.add(ambientLight);

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Load the Model
const loader = new GLTFLoader();
loader.load(
    'models/Psyche.glb',
    (gltf) => {
        const model = gltf.scene;
        model.scale.set(0.5, 0.5, 0.5); // Scale the model
        scene.add(model);
        scene.userData.model = model; // Store for rotation
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    (error) => {
        console.error('An error occurred while loading the model', error);
    }
);

// Handle Resizing
window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate the model
    if (scene.userData.model) {
        scene.userData.model.rotation.y += 0.001;
    }

    controls.update(); // Update OrbitControls
    renderer.render(scene, camera);
}
animate();
