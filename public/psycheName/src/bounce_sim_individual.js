import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import * as RAPIER from '@dimforge/rapier3d';

const gravityPresets = {
    Earth: { x: 0, y: -9.81, z: 0 },
    Moon: { x: 0, y: -1.62, z: 0 },
    Mars: { x: 0, y: -3.71, z: 0 },
    Jupiter: { x: 0, y: -24.79, z: 0 },
    Psyche: { x: 0, y: -0.144, z: 0 },
    ZeroG: { x: 0, y: 0, z: 0 }
};

const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 3, 4);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0px';
labelRenderer.domElement.style.pointerEvents = 'none';
document.body.appendChild(labelRenderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2;

// let world = new RAPIER.World({ x: 0, y: -9.81, z: 0 });
let world = new RAPIER.World({ x: 0, y: 0, z: 0 }); 

const textureLoader = new THREE.TextureLoader();
const courtTexture = textureLoader.load('/res/textures/woodFloor3.jpg');
courtTexture.anisotropy = 16;
courtTexture.wrapS = THREE.RepeatWrapping;
courtTexture.wrapT = THREE.RepeatWrapping;
courtTexture.repeat.set(2, 2);

const groundGeometry = new THREE.PlaneGeometry(10, 10);
const groundMaterial = new THREE.MeshStandardMaterial({ map: courtTexture });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

const groundBodyDesc = RAPIER.RigidBodyDesc.fixed();
const groundBody = world.createRigidBody(groundBodyDesc);
const groundCollider = RAPIER.ColliderDesc.cuboid(15, 0.2, 8.5).setRestitution(0.9);
world.createCollider(groundCollider, groundBody);

const basketballs = [];
const rigidBodies = [];
const labels = [];
const basketballTexture = textureLoader.load('/res/textures/bbtx4.jpg');
basketballTexture.anisotropy = 16;
const ballRadius = .24;
const restitution = .8;
let startHeight = 3;

const fontLoader = new FontLoader();
fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
    Object.keys(gravityPresets).forEach((location, index) => {
        const gravity = gravityPresets[location];

        // Create basketball
        const ballGeometry = new THREE.SphereGeometry(ballRadius, 32, 32);
        const ballMaterial = new THREE.MeshStandardMaterial({ map: basketballTexture });
        const basketball = new THREE.Mesh(ballGeometry, ballMaterial);
        
        basketball.position.set(index * 1.5 - 4, startHeight, 0);
        scene.add(basketball);

        // Create physics body
        const ballBodyDesc = RAPIER.RigidBodyDesc.dynamic()
            .setTranslation(basketball.position.x, startHeight, basketball.position.z);
        const ballBody = world.createRigidBody(ballBodyDesc);
        const ballCollider = RAPIER.ColliderDesc.ball(ballRadius).setRestitution(restitution);
        world.createCollider(ballCollider, ballBody);

        basketballs.push(basketball);
        rigidBodies.push(ballBody);

        // Create 3D Text for the label
        const textGeometry = new TextGeometry(location, {
            font: font,
            size: 0.3,   // Text size
            height: 0.05, // Text thickness
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.01,
            bevelSize: 0.02,
            bevelSegments: 5
        });

        const textMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);

        // Position the text above the ball (fixed)
        textMesh.position.set(basketball.position.x, startHeight + 1.5, basketball.position.z);
        textMesh.rotation.y = Math.PI / 8; // Slight rotation for better readability
        scene.add(textMesh);
    });
});



const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

function animate() {
    requestAnimationFrame(animate);
    world.step();

    basketballs.forEach((basketball, index) => {
        let position = rigidBodies[index].translation();
        basketball.position.set(position.x, position.y, position.z);
        
        // Keep text facing the camera
        textMesh.lookAt(camera.position);
    });

    controls.update();
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    labelRenderer.setSize(width, height);
});
