import * as THREE from 'three';
import gsap from 'gsap';

let viewportContainer = null;
let iframe = null;
let closeButton = null;

/**
 * Creates and shows the balance viewport with updated styling.
 */
export function showBalanceViewport() {
    if (viewportContainer) {
        viewportContainer.style.bottom = "10%";
        viewportContainer.style.opacity = "1";
        return;
    }

    console.log("Creating balance viewport");

    // Create container for the viewport
    viewportContainer = document.createElement('div');
    viewportContainer.id = 'balance-viewport-container';
    viewportContainer.style.position = 'fixed';
    viewportContainer.style.bottom = "-100%"; // Start hidden off-screen
    viewportContainer.style.left = '50%';
    viewportContainer.style.transform = 'translateX(-50%)';
    viewportContainer.style.width = '80%';
    viewportContainer.style.height = '80%';
    viewportContainer.style.borderRadius = '12px';
    viewportContainer.style.boxShadow = '0px 0px 10px rgba(249, 159, 0, 0.6)';
    viewportContainer.style.transition = 'bottom 0.5s ease-out, opacity 0.5s ease-out';
    viewportContainer.style.opacity = "0";
    viewportContainer.style.overflow = 'hidden';
    viewportContainer.style.zIndex = '900';

    // Create close button
    closeButton = document.createElement('button');
    closeButton.textContent = '✕';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '15px';
    closeButton.style.background = 'none';
    closeButton.style.border = 'none';
    closeButton.style.color = 'white';
    closeButton.style.fontSize = '1.5rem';
    closeButton.style.cursor = 'pointer';
    closeButton.style.zIndex = '1001';
    closeButton.addEventListener('click', hideBalanceViewport);

    // Create iframe
    iframe = document.createElement('iframe');
    iframe.src = './PsycheJR/kids.html';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.borderRadius = '12px';
    iframe.style.backgroundColor = '#222';
    iframe.style.boxShadow = '0px 0px 10px rgba(249, 159, 0, 0.6)';

    viewportContainer.appendChild(closeButton);
    viewportContainer.appendChild(iframe);
    document.body.appendChild(viewportContainer);

    // Animate into view
    setTimeout(() => {
        viewportContainer.style.bottom = "10%";
        viewportContainer.style.opacity = "1";
    }, 10);
}

/**
 * Hides the balance viewport with smooth transition.
 */
export function hideBalanceViewport() {
    if (!viewportContainer) return;

    viewportContainer.style.bottom = "-100%";
    viewportContainer.style.opacity = "0";

    setTimeout(() => {
        document.body.removeChild(viewportContainer);
        viewportContainer = null;
        iframe = null;
        closeButton = null;
    }, 500);
}

/**
 * Handles Escape key press to close viewport.
 */
function handleKeyDown(e) {
    if (e.key === 'Escape') {
        hideBalanceViewport();
    }
}

document.addEventListener('keydown', handleKeyDown);
