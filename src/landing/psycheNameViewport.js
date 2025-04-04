/**
 * PsycheName Viewport Module
 * 
 * This module handles loading the psycheName/psycheName.html content in an iframe
 * that appears on top of the Three.js scene.
 */

import gsap from 'gsap';

// Keep track of the viewport DOM elements
let viewportContainer = null;
let iframe = null;
let closeButton = null;

/**
 * Creates and shows the psycheName viewport with animations.
 */
export function showPsycheNameViewport() {
    // If viewport already exists, just show it
    if (viewportContainer) {
        viewportContainer.style.display = 'flex';
        return;
    }

    console.log("Creating psycheName viewport");

    // Create container for the viewport
    viewportContainer = document.createElement('div');
    viewportContainer.id = 'psyche-name-viewport-container';
    viewportContainer.style.position = 'fixed';
    viewportContainer.style.top = '50%';
    viewportContainer.style.left = '50%';
    viewportContainer.style.transform = 'translate(-50%, -50%)';
    viewportContainer.style.width = '80%';
    viewportContainer.style.maxWidth = '1440px';
    viewportContainer.style.height = '80vh';
    viewportContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    viewportContainer.style.border = '2px solid #f9a000';
    viewportContainer.style.borderRadius = '10px';
    viewportContainer.style.boxShadow = '0 0 20px rgba(249, 160, 0, 0.5)';
    viewportContainer.style.zIndex = '900';
    viewportContainer.style.display = 'flex';
    viewportContainer.style.flexDirection = 'column';
    viewportContainer.style.overflow = 'hidden';
    
    // Create header with title and close button
    const header = document.createElement('div');
    header.style.display = 'flex';
    header.style.justifyContent = 'space-between';
    header.style.alignItems = 'center';
    header.style.padding = '10px 15px';
    header.style.backgroundColor = '#f9a000';
    header.style.color = 'white';
    header.style.borderTopLeftRadius = '8px';
    header.style.borderTopRightRadius = '8px';
    
    const title = document.createElement('h2');
    title.textContent = 'The Origin of Psyche\'s Name';
    title.style.margin = '0';
    title.style.fontSize = '1.2rem';
    
    closeButton = document.createElement('button');
    closeButton.textContent = '✕';
    closeButton.style.background = 'none';
    closeButton.style.border = 'none';
    closeButton.style.color = 'white';
    closeButton.style.fontSize = '1.5rem';
    closeButton.style.cursor = 'pointer';
    closeButton.style.padding = '0 5px';
    closeButton.style.lineHeight = '1';
    
    header.appendChild(title);
    header.appendChild(closeButton);
    viewportContainer.appendChild(header);
    
    // Create iframe to load the psycheName content
    iframe = document.createElement('iframe');
    iframe.src = '/psycheName/public/name/psycheName.html';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.backgroundColor = '#fff';
    
    // Add event listener for iframe load errors
    iframe.onerror = () => {
        console.error("Failed to load psycheName iframe content");
    };
    
    // Add event listener for iframe load success
    iframe.onload = () => {
        console.log("PsycheName iframe loaded successfully");
    };
    
    viewportContainer.appendChild(iframe);
    document.body.appendChild(viewportContainer);
    
    // Create opening animations using a timeline
    const tl = gsap.timeline();
    tl.from(viewportContainer, {
        opacity: 0,
        scale: 0.8,
        duration: 0.4,
        ease: "power2.out"
    });
    tl.from(header, {
        y: -50,
        duration: 0.3,
        ease: "back.out(1.7)"
    }, "-=0.2");
    tl.from(iframe, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: "power2.out"
    }, "-=0.1");
    
    // Add event listener for close button
    closeButton.addEventListener('click', hidePsycheNameViewport);
    
    // Add event listener for Escape key
    document.addEventListener('keydown', handleKeyDown);
}

/**
 * Hides the psycheName viewport with closing animation.
 */
export function hidePsycheNameViewport() {
    if (!viewportContainer) return;

    gsap.to(viewportContainer, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
            destroyPsycheNameViewport();
        }
    });
}



/**
 * Handles keydown events for the viewport.
 */
function handleKeyDown(e) {
    if (e.key === 'Escape') {
        hidePsycheNameViewport();
    }
}

/**
 * Removes the viewport completely.
 */
export function destroyPsycheNameViewport() {
    if (viewportContainer) {
        closeButton.removeEventListener('click', hidePsycheNameViewport);
        document.removeEventListener('keydown', handleKeyDown);
        document.body.removeChild(viewportContainer);
        viewportContainer = null;
        iframe = null;
        closeButton = null;
    }
}
