/*
 * File: section7.js
 * Purpose: Loads and initializes the "Welcom/Year On Psyche" section within the Three.js scene.
 * Author(s): 
 * Date: 20 FEB 2025
 * Version: 1.0
 *
 * Description:
 * This script sets up the "Year on Psyche" section by adding title text, loading the asteroid model,
 * and creating an interactive menu. It enables interactivity on the asteroid model and includes
 * section navigation using the moveToSection function.
 *
 * Functions:
 * - loadSection1(): Loads the "Year on Psyche" section, adds a rotating asteroid model,
 *   and sets up the navigation menu.
 */

import { createMenuItem } from './utils.js';

export function loadSection7(scene, camera, sections) {
    return new Promise((resolve, reject) => {
        const sevenCoords = sections[7]?.position;
        if (!sevenCoords) {
            console.error("Error: Section 7 position not found.");
            reject("Section 7 position not found.");
            return;
        }

        const triggerCoords = {
            x: sevenCoords.x + 5,
            y: sevenCoords.y + 10,
            z: sevenCoords.z - 20
        };

        try {
            // Assuming createMenuItem is a synchronous function that adds items to the scene
            // You may need to adjust this if createMenuItem is asynchronous
            const menuItem = createMenuItem("Trigger Text", triggerCoords, scene, animateIframe, 1.5);
            scene.add(menuItem);
            resolve(); // Resolve the promise after adding the menu item
        } catch (error) {
            console.error("Error adding menu item in Section 7:", error);
            reject(error); // Reject the promise if an error occurs
        }
    });
}

function animateIframe() {
    let iframe = document.getElementById("infoFrame");

    if (!iframe) {
        iframe = document.createElement("iframe");
        iframe.id = "infoFrame";
        iframe.src = './TEST_IFRAME_SECTION7/index.html';  
        iframe.style.position = "fixed";
        iframe.style.bottom = "-100%";
        iframe.style.left = "50%";
        iframe.style.transform = "translateX(-50%)";
        iframe.style.width = "80%";
        iframe.style.height = "80%";
        iframe.style.border = "none";
        iframe.style.borderRadius = "12px";  
        iframe.style.boxShadow = "0px 0px 10px rgba(249, 159, 0, 0.6)";  
        iframe.style.transition = "bottom 0.5s ease-out, opacity 0.5s ease-out"; 
        iframe.style.opacity = "0";
        document.body.appendChild(iframe);
    }

    setTimeout(() => {
        iframe.style.bottom = "10%";
        iframe.style.opacity = "1";
    }, 10);
}

