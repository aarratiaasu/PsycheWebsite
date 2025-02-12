/**
 * objects.js - Defines and loads objects for the asteroid simulation.
 *
 * Scene Breakdown:
 * The scene consists of both dynamic and static objects to simulate an asteroid environment
 * with different gravity settings. Objects are categorized as follows:
 *
 * Dynamic Objects (Affected by Physics & Gravity):
 * - Player (Cylinder) → User-controlled character, reacts to gravity
 * - Rocks (Various Sizes) → Pick up, throw, test gravity effects
 * - Debris/Crates → Additional physics testing, movable items
 *
 * Static Objects (Not Affected by Gravity):
 * - Terrain (Ground Plane) → The asteroid's surface
 * - Large Boulders → Environmental obstacles, immovable
 * - Stop Signs/Markers → Reference objects for motion comparison
 * - Buildings/Habitat (Optional) → Adds realism to the scene
 *
 * This file handles creating and adding these objects to the Three.js scene.
 */

import * as THREE from 'three';
import { CSS2DObject, GLTFLoader } from 'three/examples/jsm/Addons.js';


export function createTerrain(scene) {
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('/res/textures/terrain_texture.png');
    texture.repeat.set(1, 1);
    // texture.wrapS = THREE.RepeatWrapping;
    // texture.wrapT = THREE.RepeatWrapping;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;

    const material = new THREE.MeshStandardMaterial({ map: texture });
    const geometry = new THREE.PlaneGeometry(100, 100);
    const ground = new THREE.Mesh(geometry, material);
  
    ground.rotation.x = -Math.PI /2;
    ground.position.y = 0;
    ground.receiveShadow = true;
    scene.add(ground);
  }

export function createPlayer(scene, playerHeight = 1.8) {
    const radius = .4;
    const playerGeometry = new THREE.CylinderGeometry(radius, radius, playerHeight, 16);
    const playerMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const player = new THREE.Mesh(playerGeometry, playerMaterial);
    
    player.position.set(0, playerHeight / 2, 0);
    player.castShadow = true;
    scene.add(player);

    createTextLabel("Player", player);

    return player;
}

export function createRocks(scene, count = 5) {
    const rocks = [];
    for(let i = 0; i < count; i++) {
        const size = Math.random() * .5 +.2;
        const geometry = new THREE.SphereGeometry(size, 12, 12);
        const material = new THREE.MeshStandardMaterial({ color: 0x7a5c45 });
        const rock = new THREE.Mesh(geometry, material);

        rock.position.set(
            (Math.random() - 0.5) * 80,
            size / 2,
            (Math.random() - 0.5) * 80
        );
        scene.add(rock);
        createTextLabel(`Rock ${i + 1}`, rock);
        rocks.push(rock);
    }
    return rocks;
}

export function createStaticObjects(scene) {
    const boulderGeometry = new THREE.SphereGeometry(2, 16, 16);
    const boulderMaterial = new THREE.MeshStandardMaterial({ color: 0x5c4033 });
    const boulder = new THREE.Mesh(boulderGeometry, boulderMaterial);
    boulder.position.set(-5, 1, -5);
    scene.add(boulder);
}

function createTextLabel(name, object) {
    const div = document.createElement('div');
    div.className = 'label';
    div.textContent = name;
    div.style.color = 'white';
    div.style.fontSize = '14px';
    div.style.textShadow = '1px, 1px, 2px, black';

    const label = new CSS2DObject(div);
    label.position.set(0, 1.2, 0);
    object.add(label);
}

export function loadObjects(scene, playerHeight = 1.8) {
    createTerrain(scene);
    const player = createPlayer(scene, playerHeight);
    const rocks = createRocks(scene, 5);
    createStaticObjects(scene);

    return { player, rocks };
}
