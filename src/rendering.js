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
import { loadObjects } from './objects';
import { CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/Addons.js';

let scene, camera, renderer, controls;
let clock = new THREE.Clock();
let labelRenderer;

async function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0,1,10);
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  labelRenderer = new CSS2DRenderer();
  labelRenderer.setSize(window.innerWidth, window.innerHeight);
  labelRenderer.domElement.style.position = 'absolute';
  labelRenderer.domElement.style.top = '0px';
  labelRenderer.domElement.style.pointerEvents = 'none';
  document.body.appendChild(labelRenderer.domElement);

  let container = document.getElementById('canvas-container');
  let width = container.clientWidth;
  let height = container.clientHeight;

  renderer.setSize(width, height);
  container.appendChild(renderer.domElement);

  window.addEventListener('resize', onWindowResize);

  addLighting();
  addControls();
  addSkySphere(scene);
  const { player, rocks } = loadObjects(scene);

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

function addControls() {
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.screenSpacePanning = false;
  controls.maxPolarAngle = Math.PI / 2;
}

function addSkySphere(scene) {
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load('/res/textures/8k_stars_milky_way.jpg');
  const skyGeometry = new THREE.SphereGeometry(500, 32, 32);
  const SkyMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
  const skySphere = new THREE.Mesh(skyGeometry, SkyMaterial);
  scene.add(skySphere);
}

function onWindowResize() {
  let container = document.getElementById('canvas-container');
  let width = container.clientWidth;
  let height = container.clientHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
  labelRenderer.setSize(width, height);
}

function animate() {
  requestAnimationFrame(animate);
  let deltaTime = clock.getDelta();
  // if(world) {
  //   world.setp();
  // }
  controls.update();
  labelRenderer.render(scene, camera);
  renderer.render(scene, camera);
}

init();