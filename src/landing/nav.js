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

export function setupNavigation(sections) {
    const menuButton = document.getElementById("cn-button");
    const menuWrapper = document.getElementById("cn-wrapper");
    const overlay = document.getElementById("cn-overlay");
    const navList = document.createElement("ul");
    navList.style.listStyle = "none";
    navList.style.padding = "0";
    let isOpen = false;

    navList.innerHTML = "";

    sections.forEach((section, index) => {
        console.log("section: ", section, "Index: ", index);
        const listItem = document.createElement("li");
        listItem.textContent = section.name;
        listItem.style.cursor = "pointer";
        listItem.style.padding = "10px";
        listItem.style.color = "black";
        listItem.style.borderBottom = "1px solid rgba(255,255,255,0.3)";

        listItem.addEventListener("click", () => {
            moveToSection(index, section.position);
            toggleMenu();
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
            submenu.style.display = "block"; // Make submenu visible by default
            submenu.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
            submenu.style.borderRadius = "5px";
            submenu.style.overflow = "hidden";
            
            // Add submenu items for each game
            const games = [
                { name: "PsycheJR", path: "../PsycheJR/kids.html" },
                { name: "Escape Velocity", path: "../escapeVelocity/escape-velocity.html" },
                { name: "SpacePic", path: "../spacepic/photo.html" }
                // Removed Balance Game and Name Generator games
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
                
                // Add click event to open the specific game viewport directly
                gameItem.addEventListener("click", (e) => {
                    e.stopPropagation(); // Prevent triggering parent click
                    
                    // Import and use the appropriate viewport based on the game
                    if (game.name === "PsycheJR") {
                        import('./kidsViewport.js').then(module => {
                            module.showKidsViewport();
                        });
                    } else if (game.name === "Escape Velocity") {
                        import('./viewportescapevelocity.js').then(module => {
                            module.showEscapeVelocityViewport();
                        });
                    } else if (game.name === "SpacePic") {
                        import('./viewportspacepic.js').then(module => {
                            module.showSpacePicViewport();
                        });
                    }
                    
                    // Hide the menu
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

    menuWrapper.appendChild(navList);

    function toggleMenu() {
        isOpen = !isOpen;

        if (isOpen) {
            menuWrapper.classList.remove("closing");
            menuWrapper.classList.add("opened-nav");
        } else {
            menuWrapper.classList.add("closing");
            setTimeout(() => {
                menuWrapper.classList.remove("opened-nav");
                menuWrapper.classList.remove("closing");
            }, 300);
        }

        overlay.classList.toggle("active", isOpen);
        menuButton.classList.toggle("open", isOpen);
    }

    menuButton.addEventListener("click", toggleMenu);
    overlay.addEventListener("click", toggleMenu);
}
