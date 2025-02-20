import { createTextMesh, loadModel, createMenu, loadBadge } from './utils.js';

export function loadSection0(scene) {
    const mainTextPosition = { x: -12, y: 206, z: -73 };
    const mainTextRotation = { x: 0, y: 0.1, z: 0 };

    createTextMesh("REFERENCES", mainTextPosition, mainTextRotation, 1, scene);


    const menuItems = [
        { text: "Development Team", onClick: () => console.log("DevTeam Clicked") },
        { text: "Sponsor", onClick: () => console.log("Sponsor Clicked") },
        { text: "Code", onClick: () => console.log("Explore Clicked") },
        { text: "Images", onClick: () => console.log("Surface Clicked") }
    ];

    createMenu(menuItems, mainTextPosition, mainTextRotation, scene);
    loadBadge(scene);
}
