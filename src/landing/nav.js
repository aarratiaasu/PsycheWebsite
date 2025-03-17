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



