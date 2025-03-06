import * as THREE from 'three';
import gsap from 'gsap';
import { moveToSection } from './sectionTracking.js';

let navGroup;
let arcPosition = 'top'; 
export function createSolarArcNav(scene, sections, position = 'top') {
    arcPosition = position; 

    if (navGroup) {
        scene.remove(navGroup);
    }

    navGroup = new THREE.Group();
    scene.add(navGroup);

    const arcRadius = 100;
    const arcSegments = sections.length;
    const arcAngle = Math.PI / 2; 
    const yOffset = position === 'top' ? 80 : -80;

    sections.forEach((section, index) => {
        const angle = (-arcAngle / 2) + (index / (arcSegments - 1)) * arcAngle;
        const x = Math.cos(angle) * arcRadius;
        const z = Math.sin(angle) * arcRadius;

        const buttonGeometry = new THREE.CircleGeometry(8, 32);
        const buttonMaterial = new THREE.MeshBasicMaterial({ color: 0xffa500 });
        const button = new THREE.Mesh(buttonGeometry, buttonMaterial);
        button.position.set(x, yOffset, z - 150);
        button.userData.sectionIndex = index;

        navGroup.add(button);

        button.userData.onPointerOver = () => {
            gsap.to(button.scale, { x: 1.2, y: 1.2, duration: 0.3 });
        };

        button.userData.onPointerOut = () => {
            gsap.to(button.scale, { x: 1, y: 1, duration: 0.3 });
        };

        button.userData.onClick = () => {
            moveToSection(index, section.position);
        };
    });
}

export function updateSolarArcPosition(scene, position) {
    createSolarArcNav(scene, navGroup.children.map(obj => ({ position: obj.position })), position);
}
