import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
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
camera.position.set(0, 3, 7);

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

let world = new RAPIER.World({ x: 0, y: -9.81, z: 0 });

const textureLoader = new THREE.TextureLoader();
const courtTexture = textureLoader.load('/res/img/bbct.png');
courtTexture.anisotropy = 16;
courtTexture.wrapS = THREE.RepeatWrapping;
courtTexture.wrapT = THREE.RepeatWrapping;
courtTexture.repeat.set(1, 1);

const groundGeometry = new THREE.PlaneGeometry(30, 17);
const groundMaterial = new THREE.MeshStandardMaterial({ map: courtTexture });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

const groundBodyDesc = RAPIER.RigidBodyDesc.fixed();
const groundBody = world.createRigidBody(groundBodyDesc);
const groundCollider = RAPIER.ColliderDesc.cuboid(15, 0.2, 8.5).setRestitution(0.3);
world.createCollider(groundCollider, groundBody);

const basketballs = [];
const rigidBodies = [];
const labels = [];
let startHeight = 6;
const loader = new GLTFLoader();

Object.entries(gravityPresets).forEach(([planet, gravity], index) => {
    loader.load('/res/models/basketball.glb', (gltf) => {
        const basketball = gltf.scene;
        basketball.scale.set(0.0024, 0.0024, 0.0024);
        
        const yOffset = Math.max(startHeight - index * 1.5, 3);
        basketball.position.set(index * 2 - 6, yOffset, 0);
        scene.add(basketball);

        const ballBodyDesc = RAPIER.RigidBodyDesc.dynamic().setTranslation(basketball.position.x, basketball.position.y, basketball.position.z);
        const ballBody = world.createRigidBody(ballBodyDesc);
        ballBody.setGravityScale(gravity.y / -9.81, true);
        ballBody.enableCcd(true);

        if (gravity.y > -1) {
            ballBody.setLinvel({ x: 0, y: -0.1, z: 0 }, true);
        }

        const ballCollider = RAPIER.ColliderDesc.ball(0.003)
            .setDensity(1.0)
            .setRestitution(0.75);
        world.createCollider(ballCollider, ballBody);

        const labelDiv = document.createElement('div');
        labelDiv.className = 'label';
        labelDiv.textContent = planet;
        labelDiv.style.color = 'white';
        labelDiv.style.fontSize = '12px';
        labelDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        labelDiv.style.padding = '2px 5px';
        labelDiv.style.borderRadius = '5px';

        const label = new CSS2DObject(labelDiv);
        label.position.set(0, 0.3, 0);
        basketball.add(label);

        basketballs.push(basketball);
        rigidBodies.push(ballBody);
        labels.push(label);
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
        labels[index].lookAt(camera.position);
    });

    controls.update();
    labelRenderer.render(scene, camera);
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
