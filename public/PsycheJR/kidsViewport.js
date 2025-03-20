/**
 * Kids Viewport Module
 * 
 * This module handles loading the public/PsycheJR/kids.html content in an iframe
 * that appears on top of the Three.js scene.
 * 
 * Optimized for responsive design across various screen sizes including:
 * - iPad Pro 11" (2388 x 1668 pixels at 264 ppi)
 * - Other common device sizes
 * - Custom sizes set via developer tools
 */

import * as THREE from 'three';
import * as ViewportStyling from '../../src/landing/viewportStyling.js';

// Keep track of the viewport DOM elements
let viewportContainer = null;
let iframe = null;
let closeButton = null;
let resizeObserver = null;

/**
 * Calculates the optimal viewport size based on screen dimensions
 * @returns {Object} The calculated width and height
 */
function calculateViewportSize() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const devicePixelRatio = window.devicePixelRatio || 1;
    
    console.log(`Screen size: ${screenWidth}x${screenHeight}, Pixel ratio: ${devicePixelRatio}`);
    
    // Calculate responsive dimensions
    let width, height, maxWidth;
    
    // Special handling for iPad Pro 11" (2388x1668) and similar devices
    const isIpadPro = (screenWidth === 2388 && screenHeight === 1668) || 
                      (screenHeight === 2388 && screenWidth === 1668);
    
    if (isIpadPro) {
        console.log("iPad Pro 11\" detected");
        // Optimized for iPad Pro 11"
        width = '90%';
        maxWidth = '2000px';
        height = '90vh';
    } else if (screenWidth >= 1200) {
        // Large screens
        width = '90%';
        maxWidth = '1600px';
        height = '90vh';
    } else if (screenWidth >= 768) {
        // Medium screens (tablets)
        width = '95%';
        maxWidth = '1200px';
        height = '95vh';
    } else {
        // Small screens (phones)
        width = '98%';
        maxWidth = '100%';
        height = '98vh';
    }
    
    return { width, maxWidth, height };
}

/**
 * Updates the viewport container size based on current screen dimensions
 */
function updateViewportSize() {
    if (!viewportContainer) return;
    
    const { width, maxWidth, height } = calculateViewportSize();
    
    viewportContainer.style.width = width;
    viewportContainer.style.maxWidth = maxWidth;
    viewportContainer.style.height = height;
    
    console.log(`Viewport resized to: width=${width}, maxWidth=${maxWidth}, height=${height}`);
}

/**
 * Creates and shows the kids viewport with animations.
 */
export function showKidsViewport() {
    // If viewport already exists, just show it
    if (viewportContainer) {
        viewportContainer.style.display = 'flex';
        updateViewportSize();
        return;
    }

    console.log("Creating kids viewport");

    // Create container for the viewport
    viewportContainer = document.createElement('div');
    viewportContainer.id = 'kids-viewport-container';
    ViewportStyling.applyViewportContainerStyles(viewportContainer);
    
    // Set responsive dimensions
    const { width, maxWidth, height } = calculateViewportSize();
    viewportContainer.style.width = width;
    viewportContainer.style.maxWidth = maxWidth;
    viewportContainer.style.height = height;
    
    // Create header with title and close button
    const header = document.createElement('div');
    ViewportStyling.applyHeaderStyles(header);
    
    const title = document.createElement('h2');
    title.textContent = 'Psyche Jr - Kids Space Explorer';
    ViewportStyling.applyTitleStyles(title);
    
    closeButton = document.createElement('button');
    closeButton.textContent = '✕';
    ViewportStyling.applyCloseButtonStyles(closeButton);
    
    header.appendChild(title);
    header.appendChild(closeButton);
    viewportContainer.appendChild(header);
    
    // Create iframe to load the kids content
    iframe = document.createElement('iframe');
    iframe.src = '/public/PsycheJR/kids.html';  // Use absolute path from project root
    ViewportStyling.applyIframeStyles(iframe);
    
    // Add scrollbar hiding styles
    ViewportStyling.addScrollbarHidingStyles(document);
    
    // Add event listener for iframe load errors
    iframe.onerror = () => {
        console.error("Failed to load kids iframe content");
    };
    
    // Add event listener for iframe load success
    iframe.onload = () => {
        console.log("Kids iframe loaded successfully");
        ViewportStyling.injectScrollbarHidingStyles(iframe);
    };
    
    viewportContainer.appendChild(iframe);
    document.body.appendChild(viewportContainer);
    
    // Add visual effects
    ViewportStyling.addShimmerEffect(viewportContainer);
    ViewportStyling.addStarParticles(viewportContainer);
    
    // Create animations
    ViewportStyling.addOpeningAnimations(viewportContainer, header, iframe);
    ViewportStyling.addPulsingGlowEffect(viewportContainer);
    
    // Add event listener for close button
    closeButton.addEventListener('click', hideKidsViewport);
    
    // Add event listener for Escape key
    document.addEventListener('keydown', handleKeyDown);
    
    // Add window resize listener
    window.addEventListener('resize', updateViewportSize);
    
    // Set up ResizeObserver for more accurate size monitoring
    // This is especially useful for detecting size changes in developer tools
    resizeObserver = new ResizeObserver(entries => {
        console.log("ResizeObserver detected size change");
        updateViewportSize();
    });
    
    resizeObserver.observe(document.body);
}

/**
 * Hides the kids viewport with closing animation.
 */
export function hideKidsViewport() {
    if (!viewportContainer) return;
    
    // Animate closing with a space-themed effect
    ViewportStyling.createClosingAnimation(viewportContainer, () => {
        viewportContainer.style.display = 'none';
        // Reset opacity and scale for next time
        viewportContainer.style.opacity = 1;
        viewportContainer.style.transform = 'translate(-50%, -50%) scale(1)';
    });
}

/**
 * Handles keydown events for the viewport.
 */
function handleKeyDown(e) {
    if (e.key === 'Escape') {
        hideKidsViewport();
    }
}

/**
 * Removes the viewport completely.
 */
export function destroyKidsViewport() {
    if (viewportContainer) {
        closeButton.removeEventListener('click', hideKidsViewport);
        document.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('resize', updateViewportSize);
        
        if (resizeObserver) {
            resizeObserver.disconnect();
            resizeObserver = null;
        }
        
        document.body.removeChild(viewportContainer);
        viewportContainer = null;
        iframe = null;
        closeButton = null;
    }
}

/**
 * Manually set a specific viewport size for testing
 * This can be called from the console in developer tools (F12)
 * @param {number} width - Width in pixels
 * @param {number} height - Height in pixels
 */
window.setKidsViewportSize = function(width, height) {
    if (!viewportContainer) {
        console.warn("Kids viewport is not currently active");
        return;
    }
    
    console.log(`Manually setting viewport size to ${width}x${height}`);
    
    viewportContainer.style.width = `${width}px`;
    viewportContainer.style.maxWidth = `${width}px`;
    viewportContainer.style.height = `${height}px`;
    
    // Center the viewport
    viewportContainer.style.transform = 'translate(-50%, -50%)';
    
    return `Viewport size set to ${width}x${height}`;
};

/**
 * Reset the viewport to responsive sizing
 * This can be called from the console in developer tools (F12)
 */
window.resetKidsViewportSize = function() {
    if (!viewportContainer) {
        console.warn("Kids viewport is not currently active");
        return;
    }
    
    updateViewportSize();
    return "Viewport size reset to responsive mode";
};
