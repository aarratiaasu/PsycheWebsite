import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';

// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 1, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lights
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

// Load 3D Models
const loader = new GLTFLoader();
const objects = []; // To store interactive objects

loader.load('model.glb', (gltf) => {
    const model = gltf.scene;
    model.position.set(5, 0, 0); // Place out of initial view
    scene.add(model);
    objects.push(model);
});

// Scroll-based Camera Movement
let scrollPercent = 0;
const scrollTargets = [
    { x: 0, y: 1, z: 5 },  // Initial position
    { x: 5, y: 1, z: 2 },  // Focus on first object
    { x: 10, y: 1, z: 0 }, // Focus on another object
];

window.addEventListener('scroll', () => {
    scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    
    let targetIndex = Math.floor(scrollPercent * (scrollTargets.length - 1));
    let nextIndex = Math.min(targetIndex + 1, scrollTargets.length - 1);
    
    let progress = (scrollPercent * (scrollTargets.length - 1)) % 1; // Smooth interpolation
    let targetPos = scrollTargets[targetIndex];
    let nextPos = scrollTargets[nextIndex];

    gsap.to(camera.position, {
        x: targetPos.x + (nextPos.x - targetPos.x) * progress,
        y: targetPos.y + (nextPos.y - targetPos.y) * progress,
        z: targetPos.z + (nextPos.z - targetPos.z) * progress,
        duration: 0.5,
        ease: "power2.out"
    });
});

// Raycasting for Clickable Objects
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('click', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(objects);
    
    if (intersects.length > 0) {
        console.log("Object clicked:", intersects[0].object);
        gsap.to(intersects[0].object.rotation, { y: "+=1", duration: 0.5 });
    }
});

// Handle Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Render Loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
