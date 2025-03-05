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
        listItem.style.position = "relative";
        
        // Add hover effect for main menu items
        listItem.addEventListener("mouseover", () => {
            listItem.style.color = "black";
        });
        
        listItem.addEventListener("mouseout", () => {
            listItem.style.color = "orange";
        });
        
        // Add click event to navigate to the section
        listItem.addEventListener("click", (e) => {
            // Only navigate if this is not the Games Section or if it is but the click wasn't on the submenu
            if (section.name !== "Games Section" || e.target === listItem) {
                moveToSection(index, section.position);
                document.body.classList.remove("overlay-open");
                
                // Hide all submenus when navigating
                document.querySelectorAll('.submenu').forEach(menu => {
                    menu.style.display = 'none';
                });
            }
        });

        navList.appendChild(listItem);
        
        // Add submenu for Games Section
        if (section.name === "Games Section") {
            // Create submenu container
            const submenu = document.createElement("ul");
            submenu.className = "submenu";
            submenu.style.listStyle = "none";
            submenu.style.padding = "0";
            submenu.style.marginLeft = "20px";
            submenu.style.display = "none";
            submenu.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
            submenu.style.borderRadius = "5px";
            submenu.style.overflow = "hidden";
            
            // Add submenu items for each game
            const games = [
                { name: "Balance Game", path: "../balance/balance.html" },
                { name: "Escape Velocity", path: "../escapeVelocity/index.html" },
                { name: "SpacePic", path: "../spacepic/photo.html" }
                // Removed Psyche Jr and Name Generator games
            ];
            
            games.forEach(game => {
                const gameItem = document.createElement("li");
                gameItem.textContent = game.name;
                gameItem.style.cursor = "pointer";
                gameItem.style.padding = "8px 15px";
                gameItem.style.color = "#00aaff";
                gameItem.style.borderBottom = "1px solid rgba(255,255,255,0.1)";
                gameItem.style.fontSize = "0.9em";
                
                // Add hover effect without fading
                gameItem.addEventListener("mouseover", () => {
                    gameItem.style.backgroundColor = "rgba(0, 170, 255, 0.2)";
                    // Ensure no opacity change on hover
                    gameItem.style.opacity = "1";
                    // Change text color to black on hover
                    gameItem.style.color = "black";
                });
                
                gameItem.addEventListener("mouseout", () => {
                    gameItem.style.backgroundColor = "transparent";
                    // Ensure no opacity change on mouseout
                    gameItem.style.opacity = "1";
                    // Restore original text color
                    gameItem.style.color = "#00aaff";
                });
                
                // Add click event to open the game directly
                gameItem.addEventListener("click", (e) => {
                    e.stopPropagation(); // Prevent triggering parent click
                    
                    // First navigate to the games section
                    moveToSection(index, section.position);
                    
                    // Then open the specific game after a short delay
                    setTimeout(() => {
                        // Create an iframe for the game
                        const gameFrame = document.createElement("iframe");
                        gameFrame.src = game.path;
                        gameFrame.style.position = "fixed";
                        gameFrame.style.top = "0";
                        gameFrame.style.left = "0";
                        gameFrame.style.width = "100%";
                        gameFrame.style.height = "100%";
                        gameFrame.style.border = "none";
                        gameFrame.style.zIndex = "1000";
                        
                        document.body.appendChild(gameFrame);
                        
                        // Add a close button
                        const closeBtn = document.createElement("button");
                        closeBtn.textContent = "✕";
                        closeBtn.style.position = "fixed";
                        closeBtn.style.top = "10px";
                        closeBtn.style.right = "10px";
                        closeBtn.style.zIndex = "1001";
                        closeBtn.style.background = "#007bff";
                        closeBtn.style.color = "white";
                        closeBtn.style.border = "none";
                        closeBtn.style.borderRadius = "50%";
                        closeBtn.style.width = "30px";
                        closeBtn.style.height = "30px";
                        closeBtn.style.cursor = "pointer";
                        closeBtn.style.fontSize = "16px";
                        closeBtn.style.display = "flex";
                        closeBtn.style.alignItems = "center";
                        closeBtn.style.justifyContent = "center";
                        
                        closeBtn.addEventListener("click", () => {
                            document.body.removeChild(gameFrame);
                            document.body.removeChild(closeBtn);
                        });
                        
                        document.body.appendChild(closeBtn);
                    }, 500);
                    
                    document.body.classList.remove("overlay-open");
                });
                
                submenu.appendChild(gameItem);
            });
            
            listItem.appendChild(submenu);
            
            // Toggle submenu on click
            listItem.addEventListener("click", (e) => {
                const currentDisplay = submenu.style.display;
                
                // Hide all other submenus first
                document.querySelectorAll('.submenu').forEach(menu => {
                    menu.style.display = 'none';
                });
                
                // Toggle this submenu
                submenu.style.display = currentDisplay === "none" ? "block" : "none";
                
                // Stop propagation to prevent navigation
                e.stopPropagation();
            });
            
            // Add dropdown indicator
            const dropdownIndicator = document.createElement("span");
            dropdownIndicator.textContent = " ▼";
            dropdownIndicator.style.fontSize = "0.8em";
            dropdownIndicator.style.marginLeft = "5px";
            listItem.appendChild(dropdownIndicator);
        }
    });

    overlay.appendChild(navList);

    toggleButton.addEventListener("click", () => {
        document.body.classList.toggle("overlay-open");
        
        // Hide all submenus when closing the overlay
        if (!document.body.classList.contains("overlay-open")) {
            document.querySelectorAll('.submenu').forEach(menu => {
                menu.style.display = 'none';
            });
        }
    });
}
