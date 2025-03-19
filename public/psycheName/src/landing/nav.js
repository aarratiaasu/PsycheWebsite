import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

let navGroup;

export function createNavMenu(scene) {
    navGroup = new THREE.Group();
    scene.add(navGroup);

    const menuItems = [
        { text: "Mission Overview" },
        { text: "Section 2" },
        { text: "Section 3" },
        { text: "Psyche" },
        { text: "References" }
    ];

    const fontLoader = new FontLoader();
    fontLoader.load('/res/font/GenosThin_Regular.json', (font) => {
        menuItems.forEach((item, index) => {
            const textGeometry = new TextGeometry(item.text, {
                font: font,
                size: 0.5,
                depth: 0.1,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.01,
                bevelSize: 0.02,
                bevelSegments: 5
            });

            const textMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
            const textMesh = new THREE.Mesh(textGeometry, textMaterial);

            // Positioning menu items vertically
            textMesh.position.set(-26, 16 - index * 0.7, -10); // Adjusted relative to camera position

            navGroup.add(textMesh);
        });
    });
}

export function getNavGroup() {
    return navGroup;
}

export function setNavPosition(x, y, z) {
    if (navGroup) {
        navGroup.position.set(x, y, z);
    }
}