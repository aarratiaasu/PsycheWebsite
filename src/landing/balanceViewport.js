/**
 * Balance Viewport Module
 * 
 * This module handles loading the balance.html content in an iframe
 * that appears on top of the Three.js scene.
 * 
 * Updated to include futuristic animations and visual effects.
 */

import * as THREE from 'three';
import gsap from 'gsap';

// Keep track of the viewport DOM elements
let viewportContainer = null;
let iframe = null;
let closeButton = null;

/**
 * Creates and shows the balance viewport with futuristic animations.
 */
export function showBalanceViewport() {
    // If viewport already exists, just show it and restart futuristic pulses
    if (viewportContainer) {
        viewportContainer.style.display = 'flex';
        // Restart pulsating animations
        gsap.to(viewportContainer, { borderColor: "#fff", duration: 1.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
        gsap.to(viewportContainer.querySelector('div'), { boxShadow: "0 0 20px 5px #45a049", duration: 1.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
        return;
    }

    console.log("Creating balance viewport");

    // Create container for the viewport
    viewportContainer = document.createElement('div');
    viewportContainer.id = 'balance-viewport-container';
    viewportContainer.style.position = 'fixed';
    viewportContainer.style.top = '50%';
    viewportContainer.style.left = '50%';
    viewportContainer.style.transform = 'translate(-50%, -50%)';
    viewportContainer.style.width = '110%'; // Increased from 90% to 110%
    viewportContainer.style.maxWidth = '1440px'; // Increased from 1200px to 1440px
    viewportContainer.style.height = '100vh'; // Increased from 85vh to 95vh (10% higher)
    viewportContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    viewportContainer.style.border = '2px solid #45a049';
    viewportContainer.style.borderRadius = '10px';
    viewportContainer.style.boxShadow = '0 0 20px rgba(69, 160, 73, 0.5)';
    viewportContainer.style.zIndex = '1000';
    viewportContainer.style.display = 'flex';
    viewportContainer.style.flexDirection = 'column';
    viewportContainer.style.overflow = 'hidden';
    
    // Create header with title and close button
    const header = document.createElement('div');
    header.style.display = 'flex';
    header.style.justifyContent = 'space-between';
    header.style.alignItems = 'center';
    header.style.padding = '10px 15px';
    header.style.backgroundColor = '#45a049';
    header.style.color = 'white';
    header.style.borderTopLeftRadius = '8px';
    header.style.borderTopRightRadius = '8px';
    
    const title = document.createElement('h2');
    title.textContent = 'Psyche Balance Challenge';
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
    
    // Create iframe to load the balance.html content
    iframe = document.createElement('iframe');
    iframe.src = './balance/balance.html';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.backgroundColor = '#222';
    
    // Add event listener for iframe load errors
    iframe.onerror = () => {
        console.error("Failed to load iframe content");
    };
    
    // Add event listener for iframe load success
    iframe.onload = () => {
        console.log("Iframe loaded successfully");
    };
    
    viewportContainer.appendChild(iframe);
    document.body.appendChild(viewportContainer);
    
    // Create futuristic opening animations using a timeline
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

    // Apply continuous futuristic pulse effects
    gsap.to(viewportContainer, { borderColor: "#fff", duration: 1.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(header, { boxShadow: "0 0 20px 5px #45a049", duration: 1.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
    
    // Add event listener for close button
    closeButton.addEventListener('click', hideBalanceViewport);
    
    // Add event listener for Escape key
    document.addEventListener('keydown', handleKeyDown);
}

/**
 * Hides the balance viewport with futuristic closing animation.
 */
export function hideBalanceViewport() {
    if (!viewportContainer) return;
    
    // Animate closing with a reverse futuristic effect
    gsap.to(viewportContainer, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
            viewportContainer.style.display = 'none';
            // Reset opacity and scale for next time
            viewportContainer.style.opacity = 1;
            viewportContainer.style.transform = 'translate(-50%, -50%) scale(1)';
            
            // Show the menu when viewport is closed
            document.body.classList.add("overlay-open");
        }
    });
}

/**
 * Handles keydown events for the viewport.
 */
function handleKeyDown(e) {
    if (e.key === 'Escape') {
        hideBalanceViewport();
    }
}

/**
 * Removes the viewport completely.
 */
export function destroyBalanceViewport() {
    if (viewportContainer) {
        closeButton.removeEventListener('click', hideBalanceViewport);
        document.removeEventListener('keydown', handleKeyDown);
        document.body.removeChild(viewportContainer);
        viewportContainer = null;
        iframe = null;
        closeButton = null;
    }
}
