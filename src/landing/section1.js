import { createTextMesh, loadModel, createMenu, enableModelHoverEffect } from './utils.js';

let asteroidModel = null;

export function loadSection1(scene, camera) {
    const mainTextPosition = { x: -12, y: 3, z: 0 };
    const mainTextRotation = { x: 0, y: Math.PI / 12, z: 0 };

    createTextMesh("YEAR ON PSYCHE", mainTextPosition, mainTextRotation, 1.5, scene);

    loadModel(
        "asteroid",
        "/res/models/16psyche.glb",
        { x: 20, y: 12, z: -10 },
        2,
        { x: 0, y: 0, z: 0 },
        {
            position: { x: 10, y: 6, z: -2, duration: 3, ease: "power2.out" },
            rotation: { y: -6.28319, z: 6.28319, duration: 45, ease: "linear", repeat: -1 }
        },
        scene, 
        (model) => { asteroidModel = model; }
    );

    const menuItems = [
        { text: "Mission Overview", onClick: () => console.log("Mission Overview Clicked") },
        { text: "Resources", onClick: () => console.log("Resources Clicked") },
        { text: "Explore", onClick: () => console.log("Explore Clicked") },
        { text: "Surface", onClick: () => console.log("Surface Clicked") },
        { text: "Physics", onClick: () => console.log("physics Clicked") }

    ];

    createMenu(menuItems, mainTextPosition, mainTextRotation, scene);
    enableModelHoverEffect(camera, scene); 
}
