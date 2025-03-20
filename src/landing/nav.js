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
    const iconWrapper = document.getElementById("cn-icon-wrapper");
    const menuWrapper = document.getElementById("cn-wrapper");
    const overlay = document.getElementById("cn-overlay");
    const navList = document.createElement("ul");
    navList.style.listStyle = "none";
    navList.style.padding = "0";

    let isOpen = false;
    let wasClicked = false;
    let closeTimeout = null;
    let hoverTimeout = null;

    navList.innerHTML = "";

    sections.forEach((section, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = section.name;
        listItem.style.cursor = "pointer";
        listItem.style.padding = "10px";
        listItem.style.color = "black";
        listItem.style.borderBottom = "1px solid rgba(255,255,255,0.3)";

        listItem.addEventListener("click", () => {
            moveToSection(index, section.position);
            closeMenu();
        });

        navList.appendChild(listItem);
    });

    menuWrapper.appendChild(navList);

    function openMenu() {
        clearTimeout(closeTimeout); // Reset any pending close event
        clearTimeout(hoverTimeout);

        isOpen = true;
        wasClicked = true;

        menuWrapper.classList.remove("closing");
        menuWrapper.classList.add("opened-nav");
        overlay.classList.add("active");
        iconWrapper.classList.add("active");

        // Ensure full 360° rotation
        iconWrapper.style.transition = "transform 0.5s ease-in-out";
        iconWrapper.style.transform = "rotate(360deg)";
    }

    function closeMenu() {
        if (!isOpen) return;

        isOpen = false;
        wasClicked = false;
        menuWrapper.classList.add("closing");

        closeTimeout = setTimeout(() => {
            menuWrapper.classList.remove("opened-nav");
            menuWrapper.classList.remove("closing");
        }, 300);

        overlay.classList.remove("active");
        iconWrapper.classList.remove("active");

        // Reverse rotate back
        iconWrapper.style.transition = "transform 0.5s ease-in-out";
        iconWrapper.style.transform = "rotate(0deg)";
    }

    function toggleMenu() {
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    function delayedClose() {
        if (wasClicked) return; // Prevent hover delay from closing if explicitly clicked

        hoverTimeout = setTimeout(() => {
            closeMenu();
        }, 250); // Short delay before closing after leaving hover
    }

    // Hover opens menu
    iconWrapper.addEventListener("mouseenter", () => {
        if (!wasClicked) openMenu();
    });

    menuWrapper.addEventListener("mouseenter", () => {
        if (!wasClicked) openMenu();
    });

    // Add delay before closing when hover is removed
    iconWrapper.addEventListener("mouseleave", delayedClose);
    menuWrapper.addEventListener("mouseleave", delayedClose);

    // Click toggles menu open/close
    iconWrapper.addEventListener("click", toggleMenu);

    // Click outside should close the menu
    overlay.addEventListener("click", closeMenu);
    document.addEventListener("click", (event) => {
        if (!menuWrapper.contains(event.target) && !iconWrapper.contains(event.target)) {
            closeMenu();
        }
    });
}
