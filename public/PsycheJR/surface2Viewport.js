/**
 * Surface2 Viewport Module
 * 
 * This module handles loading the public/PsycheJR/surface2.html content in an iframe
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
    } else if (screenWidth >= 2000) {
        // Extra large screens (2000px-2560px)
        width = '85%';
        maxWidth = '2400px';
        height = '85vh';
    } else if (screenWidth >= 1600) {
        // Very large screens (1600px-2000px)
        width = '88%';
        maxWidth = '1900px';
        height = '88vh';
    } else if (screenWidth >= 1200) {
        // Large screens (1200px-1600px)
        width = '90%';
        maxWidth = '1500px';
        height = '90vh';
    } else if (screenWidth >= 992) {
        // Medium-large screens (992px-1200px)
        width = '92%';
        maxWidth = '1150px';
        height = '92vh';
    } else if (screenWidth >= 768) {
        // Medium screens (tablets) (768px-992px)
        width = '95%';
        maxWidth = '950px';
        height = '95vh';
    } else {
        // Small screens (phones) (<768px)
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
 * Creates and shows the surface2 viewport with animations.
 */
export function showSurface2Viewport() {
    // If viewport already exists, just show it
    if (viewportContainer) {
        viewportContainer.style.display = 'flex';
        updateViewportSize();
        return;
    }

    console.log("Creating surface2 viewport");

    // Create container for the viewport
    viewportContainer = document.createElement('div');
    viewportContainer.id = 'surface2-viewport-container';
    ViewportStyling.applyViewportContainerStyles(viewportContainer, {
        backgroundColor: 'rgba(0, 0, 0, 0.05)', // Very transparent background
        borderColor: 'rgba(122, 95, 62, 0.3)',  // Semi-transparent border
        boxShadow: '0 0 15px rgba(122, 95, 62, 0.3)' // Subtle glow
    });
    
    // Set responsive dimensions
    const { width, maxWidth, height } = calculateViewportSize();
    viewportContainer.style.width = width;
    viewportContainer.style.maxWidth = maxWidth;
    viewportContainer.style.height = height;
    
    // Create header with title and close button
    const header = document.createElement('div');
    ViewportStyling.applyHeaderStyles(header, {
        backgroundColor: 'rgba(10, 10, 20, 0.2)',
        gradientStart: 'rgba(10, 10, 20, 0.2)',
        gradientEnd: 'rgba(20, 20, 40, 0.2)'
    });
    
    const title = document.createElement('h2');
    title.textContent = 'The Surface of Psyche';
    ViewportStyling.applyTitleStyles(title);
    
    closeButton = document.createElement('button');
    closeButton.textContent = '✕';
    ViewportStyling.applyCloseButtonStyles(closeButton);
    
    header.appendChild(title);
    header.appendChild(closeButton);
    viewportContainer.appendChild(header);
    
    // Create iframe to load the surface2 content
    iframe = document.createElement('iframe');
    iframe.src = '/public/PsycheJR/surface2.html';  // Use absolute path from project root
    ViewportStyling.applyIframeStyles(iframe, {
        backgroundColor: 'rgba(0, 0, 0, 0.0)' // Completely transparent background
    });
    
    // Add scrollbar hiding styles
    ViewportStyling.addScrollbarHidingStyles(document);
    
    // Add event listener for iframe load errors
    iframe.onerror = () => {
        console.error("Failed to load surface2 iframe content");
    };
    
    // Add event listener for iframe load success
    iframe.onload = () => {
        console.log("Surface2 iframe loaded successfully");
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
    closeButton.addEventListener('click', hideSurface2Viewport);
    
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
 * Hides the surface2 viewport with closing animation.
 */
export function hideSurface2Viewport() {
    if (!viewportContainer) return;
    
    // Animate closing effect
    ViewportStyling.createClosingAnimation(viewportContainer, () => {
        viewportContainer.style.display = 'none';
        // Reset opacity and scale for next time
        viewportContainer.style.opacity = 1;
        viewportContainer.style.transform = 'translate(-50%, -50%) scale(1)';
        
        // Show the menu when viewport is closed
        document.body.classList.add("overlay-open");
    });
}

/**
 * Handles keydown events for the viewport.
 */
function handleKeyDown(e) {
    if (e.key === 'Escape') {
        hideSurface2Viewport();
    }
}

/**
 * Removes the viewport completely.
 */
export function destroySurface2Viewport() {
    if (viewportContainer) {
        closeButton.removeEventListener('click', hideSurface2Viewport);
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
window.setSurface2ViewportSize = function(width, height) {
    if (!viewportContainer) {
        console.warn("Surface2 viewport is not currently active");
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
window.resetSurface2ViewportSize = function() {
    if (!viewportContainer) {
        console.warn("Surface2 viewport is not currently active");
        return;
    }
    
    updateViewportSize();
    return "Viewport size reset to responsive mode";
};
