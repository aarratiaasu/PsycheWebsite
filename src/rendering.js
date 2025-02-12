/**
 * Create the three.js scene
 * Add:
 *  ground
 *  lighting
 *  orbitControls
 *  windowResize control
 *  Animate Function
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';


let scene, camera, renderer, controls;
let clock = new THREE.Clock();

async function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0,1,10);
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  let container = document.getElementById('canvas-container');
  let width = container.clientWidth;
  let height = container.clientHeight;

  renderer.setSize(width, height);
  container.appendChild(renderer.domElement);

  window.addEventListener('resize', onWindowResize);

  addLighting();
  addControls();
  addGroundPlane(scene);
  

  animate();
}

function addLighting() {
  let ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);
  
  let directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5,10,5);
  directionalLight.castShadow = true;
  scene.add(directionalLight);
}

export function addGroundPlane(scene) {
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load('/res/textures/grass.jpg');
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  const material = new THREE.MeshStandardMaterial({ map: texture });
  const geometry = new THREE.PlaneGeometry(100, 100);
  const ground = new THREE.Mesh(geometry, material);

  ground.rotation.x = -Math.PI /2;
  ground.position.y = 0;
  ground.receiveShadow = true;
  scene.add(ground);
}

function addControls() {
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.screenSpacePanning = false;
  controls.maxPolarAngle = Math.PI / 2;
}

function onWindowResize() {
  let container = document.getElementById('canvas-container');
  let width = container.clientWidth;
  let height = container.clientHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

function animate() {
  requestAnimationFrame(animate);
  let deltaTime = clock.getDelta();
  // if(world) {
  //   world.setp();
  // }
  controls.update();
  renderer.render(scene, camera);
}

init();