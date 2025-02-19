import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

export function createStarfield(scene) {


    const starGeometry = new THREE.BufferGeometry();
    const starVertices = [];

    const minDistance = 2000; // Ensure stars are at least this far
    const maxDistance = 3000; // Max range for stars

    for (let i = 0; i < 5000; i++) {
        let x, y, z, distance;

        // Keep generating positions until they are beyond minDistance
        do {
            x = (Math.random() - 0.5) * maxDistance * 2;
            y = (Math.random() - 0.5) * maxDistance * 2;
            z = (Math.random() - 0.5) * maxDistance * 2;
            distance = Math.sqrt(x * x + y * y + z * z);
        } while (distance < minDistance); // Reject stars that are too close

        starVertices.push(x, y, z);
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));

    const starMaterial = new THREE.PointsMaterial({ 
        color: 0xffffff, 
        size: 1.5, // Reduce size slightly
        sizeAttenuation: true
    });

    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);
}

export function loadSun(scene, renderer, camera) {
    // Add sun
    const sunGeometry = new THREE.SphereGeometry(6, 32, 32);
    const sunMaterial = new THREE.MeshStandardMaterial({
        emissive: new THREE.Color(0xffffcc),
        emissiveIntensity: 3, 
        roughness: 0.1,
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.position.set(-100, 250, -500);
    scene.add(sun);

    const sunLight = new THREE.PointLight(0xffaa00, 10, 500);
    sunLight.position.copy(sun.position);
    scene.add(sunLight);

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        2.0,  // Intensity 
        0.4,  // spread of glow
        1.2  // brightness trigger for bloom
    );
    composer.addPass(bloomPass);
    return composer;
}