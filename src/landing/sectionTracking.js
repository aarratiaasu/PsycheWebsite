import gsap from 'gsap';
import * as THREE from 'three';

let camera, renderer, sections, currentSection = 1, scrollProgress = 1;
let isAnimating = false; // Scroll lock flag

export function initSectionTracking(cam, sectionList, rend) {
    camera = cam;
    sections = sectionList;
    renderer = rend; 
    window.addEventListener("wheel", onScroll);
    window.addEventListener("touchmove", onScroll);
    window.addEventListener('resize', onResize);
}

function onResize() {
    const aspect = window.innerWidth / window.innerHeight;

    camera.aspect = aspect;
    camera.updateProjectionMatrix();

    if (renderer) {
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); 
    }
}

export function onScroll(event) {
    if (isAnimating) return; 
    scrollProgress += event.deltaY * 0.005; 
    scrollProgress = Math.max(0, Math.min(scrollProgress, sections.length - 1));

    const newSection = Math.round(scrollProgress);
    if (newSection !== currentSection) {
        isAnimating = true; 
        moveToSection(newSection);
    }
}

export function moveToSection(sectionIndex, lookAt = null) {
    if (sectionIndex < 0 || sectionIndex >= sections.length) return;
    currentSection = sectionIndex;
    scrollProgress = sectionIndex;

    const sectionPos = sections[sectionIndex];
    const duration = 2;

    gsap.to(camera.position, {
        x: sectionPos.x,
        y: sectionPos.y,
        z: sectionPos.z,
        duration: duration,
        ease: "power4.inOut",
        onUpdate: () => {
            if (lookAt && sectionIndex === 6) {
                // camera.lookAt(lookAt.x, lookAt.y, lookAt.z); // Look at Psyche model in Psyche section
                console.log("yay!");
            }
        },
        onComplete: () => {
            if (sectionIndex !== 6) {
                const resetLookAt = new THREE.Vector3(
                    camera.position.x,
                    camera.position.y,
                    camera.position.z - 1 // Look directly along negative Z-axis
                );
                // camera.lookAt(resetLookAt);
            }

            isAnimating = false;
            console.log("Moved to Section:", currentSection);

            // Log the new camera direction after the move
            const direction = new THREE.Vector3();
            camera.getWorldDirection(direction);
            console.log('Camera is now looking in direction:', direction);
        }
    });
}


function logCameraDirection() {
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    console.log('Camera is looking in direction:', direction);
}



export function getCurrentSection() {
    return currentSection;
}
