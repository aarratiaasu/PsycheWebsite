import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as RAPIER from '@dimforge/rapier3d';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

const gravityPresets = {
    EARTH: { x: 0, y: -9.81, z: 0 },
    MOON: { x: 0, y: -1.62, z: 0 },
    PSYCHE: { x: 0, y: -0.144, z: 0 },
    ZERO_G: { x: 0, y: 0, z: 0 }
};

const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1, 3);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2;

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
const ballRadius = 0.24;
const restitution = 0.8;
let startHeight = 2;
const textMeshes = [];

const fontLoader = new FontLoader();
fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
    Object.keys(gravityPresets).forEach((location, index) => {
        const gravity = gravityPresets[location];

        const ballGeometry = new THREE.SphereGeometry(ballRadius, 32, 32);
        const ballMaterial = new THREE.MeshStandardMaterial({ map: basketballTexture });
        const basketball = new THREE.Mesh(ballGeometry, ballMaterial);
        
        basketball.position.set(index * 1.5 - (Object.keys(gravityPresets).length * 1.5) / 2, startHeight, 0);
        scene.add(basketball);

        const ballBodyDesc = RAPIER.RigidBodyDesc.dynamic()
            .setTranslation(basketball.position.x, startHeight, basketball.position.z);
        const ballBody = world.createRigidBody(ballBodyDesc);
        const ballCollider = RAPIER.ColliderDesc.ball(ballRadius * 0.98).setRestitution(restitution);
        world.createCollider(ballCollider, ballBody);

        const gravityForce = { x: gravity.x * ballBody.mass(), y: gravity.y * ballBody.mass(), z: gravity.z * ballBody.mass() };
        ballBody.addForce(gravityForce, true);

        basketballs.push(basketball);
        rigidBodies.push(ballBody);

        const textGeometry = new TextGeometry(location, {
            font: font,
            size: 0.2,
            depth: .1,
            height: 0.05,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.01,
            bevelSize: 0.01,
            bevelSegments: 3
        });
        textGeometry.computeBoundingBox();
        const textWidth = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;
        console.log("Text width", textWidth);
        const textMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.set(basketball.position.x - (textWidth/2), 0, 0);
        textMeshes.push(textMesh);
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

    rigidBodies.forEach((body, index) => {
        let position = body.translation();
        basketballs[index].position.set(position.x, position.y, position.z);

        if (Object.keys(gravityPresets)[index] === "Psyche") {
            let velocity = body.linvel();
            let gravity = gravityPresets["Psyche"].y;
            body.setLinvel({ x: velocity.x, y: velocity.y + gravity * world.timestep, z: velocity.z }, true);
        }
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
});
