import { createMenuItem } from './utils.js';

export function loadSection7(scene, camera, sections) {
    const sevenCoords = sections[7]?.position;
    if (!sevenCoords) {
        console.error("Error: Section 7 position not found.");
        return Promise.reject("Section 7 position not found.");
    }

    const triggerCoords = {
        x: sevenCoords.x + 5,
        y: sevenCoords.y + 10,
        z: sevenCoords.z - 20
    };

    scene.add(createMenuItem("Trigger Text", triggerCoords, scene, animateIframe, 1.5));
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