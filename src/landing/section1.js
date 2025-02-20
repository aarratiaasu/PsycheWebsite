import { createTextMesh, loadModel, createMenu, makeModelClickable } from './utils.js';
import { moveToSection } from './sectionTracking.js';

let asteroidModel = null;
const psycheModelPosition = { x: 20, y: 16, z: -45 };

export function loadSection1(scene, camera) {
    const mainTextPosition = { x: -12, y: 3, z: 0 };
    const mainTextRotation = { x: 0, y: Math.PI / 12, z: 0 };

    return new Promise((resolve, reject) => { 
        createTextMesh("YEAR ON PSYCHE", mainTextPosition, mainTextRotation, 1.5, scene);
        loadModel(
            "asteroid",                     
            "/res/models/16psyche.glb",
            { x: 80, y: 60, z: 20 },
            8,
            { x: 0, y: 0, z: 0 },
            {
                position: { x: 20, y: 16, z: -45, duration: 3, ease: "power2.out" },
                rotation: { y: -6.28319, z: 6.28319, duration: 45, ease: "linear", repeat: -1 }
            },
            scene, 
            (model) => { 
                asteroidModel = model;
                makeModelClickable(asteroidModel, () => {
                    console.log("asteroid clicked");
                    moveToSection(6, psycheModelPosition);
                });
                resolve();
            }
        );
        setTimeout(() => reject("Model load timeout"), 10000); 
    }).then(() => {
        const menuItems = [
            { text: "Mission Overview", onClick: () => moveToSection(1) },
            { text: "Section 2", onClick: () => moveToSection(2) },
            { text: "Section 3", onClick: () => moveToSection(3) },
            { text: "Psyche", onClick: () => moveToSection(6, psycheModelPosition) }, 
            { text: "References", onClick: () => moveToSection(0) }
        ];
        createMenu(menuItems, mainTextPosition, mainTextRotation, scene);
    }).catch((error) => {
        console.error("Error loading Section 1:", error);
    });
}
