import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { moveToSection } from './sectionTracking.js';


export function animateScrollIndicator() {
    const scrollIndicator = document.querySelector(".mouse-scroll-indicator");

    if (!scrollIndicator) return;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const dynamicScale = Math.min(viewportWidth, viewportHeight) / 300; 

    document.documentElement.style.setProperty("--dynamic-scale", dynamicScale);

    const scrollText = document.createElement("div");
    scrollText.id = "scroll-text";
    scrollText.textContent = "SCROLL UP OR DOWN TO EXPLORE";
    document.body.appendChild(scrollText);

    setTimeout(() => {
        scrollIndicator.classList.add("moved");
        scrollText.classList.add("fade-out");
    }, 4000);

    setTimeout(() => {
        scrollText.remove();
    }, 4500);
}

// export function initOverlayToggle() {
//     document.addEventListener("DOMContentLoaded", function () {
//       const toggleButton = document.getElementById("toggleOverlay");
//       const overlay = document.getElementById("infoOverlay");
  
//       if (toggleButton && overlay) {
//         toggleButton.addEventListener("click", function () {
//           document.body.classList.toggle("overlay-open");
//         });
//       }
//     });
//   }


  export function setupNavigation(sections) {
    const overlay = document.getElementById("infoOverlay"); 
    const toggleButton = document.getElementById("toggleOverlay"); 
    overlay.innerHTML = "";

    const navList = document.createElement("ul");
    navList.style.listStyle = "none";
    navList.style.padding = "0";

    sections.forEach((section, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = section.name;
        listItem.style.cursor = "pointer";
        listItem.style.padding = "10px";
        listItem.style.color = "orange";
        listItem.style.borderBottom = "1px solid rgba(255,255,255,0.3)";
        
        listItem.addEventListener("click", () => {
            moveToSection(index, section.position);
            document.body.classList.remove("overlay-open"); 
        });

        navList.appendChild(listItem);
    });

    overlay.appendChild(navList);

    toggleButton.addEventListener("click", () => {
        document.body.classList.toggle("overlay-open");
    });
}