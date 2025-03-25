/**
 * Viewport Styling Module
 * 
 * This module provides styling functions for viewports that appear on top of the Three.js scene.
 * It can be used by different viewport modules to maintain consistent styling.
 */

import gsap from 'gsap';

/**
 * Applies common styles to a viewport container
 * @param {HTMLElement} container - The viewport container element
 * @param {Object} options - Optional styling options
 */
export function applyViewportContainerStyles(container, options = {}) {
    const {
        backgroundColor = 'rgba(0, 0, 0, 0.125)',
        borderColor = '#ffffcc',
        borderWidth = '2px',
        borderRadius = '10px',
        boxShadow = '0 0 25px rgba(255, 255, 204, 0.6)',
        zIndex = '900'
    } = options;
    
    container.style.position = 'fixed';
    container.style.top = '50%';
    container.style.left = '50%';
    container.style.transform = 'translate(-50%, -50%)';
    container.style.backgroundColor = backgroundColor;
    container.style.border = `${borderWidth} solid ${borderColor}`;
    container.style.borderRadius = borderRadius;
    container.style.boxShadow = boxShadow;
    container.style.zIndex = zIndex;
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.overflow = 'hidden';
}

/**
 * Applies header styles to a viewport header
 * @param {HTMLElement} header - The header element
 * @param {Object} options - Optional styling options
 */
export function applyHeaderStyles(header, options = {}) {
    const {
        backgroundColor = 'rgba(26, 26, 58, 0.125)',
        gradientStart = 'rgba(26, 26, 58, 0.125)',
        gradientEnd = 'rgba(58, 58, 106, 0.125)',
        textColor = 'white',
        padding = '10px 15px'
    } = options;
    
    header.style.display = 'flex';
    header.style.justifyContent = 'space-between';
    header.style.alignItems = 'center';
    header.style.padding = padding;
    header.style.backgroundColor = backgroundColor;
    header.style.backgroundImage = `linear-gradient(to right, ${gradientStart}, ${gradientEnd})`;
    header.style.color = textColor;
    header.style.borderTopLeftRadius = '8px';
    header.style.borderTopRightRadius = '8px';
}

/**
 * Applies title styles to a viewport title
 * @param {HTMLElement} title - The title element
 * @param {Object} options - Optional styling options
 */
export function applyTitleStyles(title, options = {}) {
    const {
        fontSize = '1.2rem',
        textShadow = '0 0 5px rgba(255, 255, 204, 0.7)',
        letterSpacing = '0.5px'
    } = options;
    
    title.style.margin = '0';
    title.style.fontSize = fontSize;
    title.style.textShadow = textShadow;
    title.style.letterSpacing = letterSpacing;
}

/**
 * Applies close button styles to a viewport close button
 * @param {HTMLElement} button - The close button element
 * @param {Object} options - Optional styling options
 */
export function applyCloseButtonStyles(button, options = {}) {
    const {
        color = 'white',
        fontSize = '1.5rem'
    } = options;
    
    button.style.background = 'none';
    button.style.border = 'none';
    button.style.color = color;
    button.style.fontSize = fontSize;
    button.style.cursor = 'pointer';
    button.style.padding = '0 5px';
    button.style.lineHeight = '1';
}

/**
 * Applies iframe styles to a viewport iframe
 * @param {HTMLElement} iframe - The iframe element
 * @param {Object} options - Optional styling options
 */
export function applyIframeStyles(iframe, options = {}) {
    const {
        backgroundColor = 'rgba(0, 0, 0, 0.1)'
    } = options;
    
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.backgroundColor = backgroundColor;
    iframe.style.overflow = 'auto';
    iframe.scrolling = 'yes'; // Enable scrolling
}

/**
 * Adds a style element to hide scrollbars
 * @param {Document} document - The document to add the style to
 */
export function addScrollbarHidingStyles(document) {
    const scrollbarStyle = document.createElement('style');
    scrollbarStyle.textContent = `
        /* Hide scrollbars for WebKit browsers */
        iframe::-webkit-scrollbar,
        *::-webkit-scrollbar {
            width: 0 !important;
            height: 0 !important;
            display: none !important;
        }
        
        /* Hide scrollbars for Firefox */
        iframe,
        * {
            scrollbar-width: none !important;
            -ms-overflow-style: none !important;
        }
        
        /* Allow scrolling but hide scrollbars */
        iframe {
            overflow: auto !important;
        }
    `;
    document.head.appendChild(scrollbarStyle);
}

/**
 * Injects scrollbar hiding styles into an iframe
 * @param {HTMLIFrameElement} iframe - The iframe to inject styles into
 */
export function injectScrollbarHidingStyles(iframe) {
    try {
        // Try to access iframe content
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        // Create and inject a style element to hide scrollbars in the iframe content
        const iframeStyle = iframeDoc.createElement('style');
        iframeStyle.textContent = `
            /* Hide all scrollbars in the iframe content */
            ::-webkit-scrollbar { 
                width: 0 !important; 
                height: 0 !important; 
                display: none !important; 
            }
            * { 
                scrollbar-width: none !important; 
                -ms-overflow-style: none !important;
            }
            html, body {
                overflow: auto !important;
                scrollbar-width: none !important;
                -ms-overflow-style: none !important;
            }
            
            /* Ensure content is scrollable */
            body {
                overflow-y: auto !important;
                overflow-x: auto !important;
            }
        `;
        iframeDoc.head.appendChild(iframeStyle);
    } catch (e) {
        console.error("Could not modify iframe content due to cross-origin restrictions:", e);
    }
}

/**
 * Adds a shimmer effect to a viewport container
 * @param {HTMLElement} container - The container to add the effect to
 */
export function addShimmerEffect(container) {
    const shimmerEffect = document.createElement('div');
    shimmerEffect.style.position = 'absolute';
    shimmerEffect.style.top = '0';
    shimmerEffect.style.left = '0';
    shimmerEffect.style.width = '100%';
    shimmerEffect.style.height = '100%';
    shimmerEffect.style.pointerEvents = 'none';
    shimmerEffect.style.background = 'radial-gradient(circle at 50% 50%, rgba(255, 255, 204, 0.03) 0%, transparent 80%)';
    shimmerEffect.style.borderRadius = '10px';
    shimmerEffect.style.zIndex = '1';
    container.appendChild(shimmerEffect);
}

/**
 * Adds animated star particles to a viewport container
 * @param {HTMLElement} container - The container to add stars to
 * @param {number} count - The number of stars to add
 */
export function addStarParticles(container, count = 20) {
    // Add subtle star particles
    const starsContainer = document.createElement('div');
    starsContainer.style.position = 'absolute';
    starsContainer.style.top = '0';
    starsContainer.style.left = '0';
    starsContainer.style.width = '100%';
    starsContainer.style.height = '100%';
    starsContainer.style.overflow = 'hidden';
    starsContainer.style.pointerEvents = 'none';
    starsContainer.style.zIndex = '0';
    starsContainer.style.borderRadius = '10px';
    container.appendChild(starsContainer);
    
    // Create star particles
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        const size = Math.random() * 2 + 1; // 1-3px
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const opacity = Math.random() * 0.5 + 0.1; // 0.1-0.6
        const animDuration = Math.random() * 3 + 2; // 2-5s
        const animDelay = Math.random() * 2; // 0-2s
        
        star.style.position = 'absolute';
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.borderRadius = '50%';
        star.style.backgroundColor = '#ffffcc';
        star.style.left = `${posX}%`;
        star.style.top = `${posY}%`;
        star.style.opacity = `${opacity}`;
        
        starsContainer.appendChild(star);
        
        // Animate the star's opacity
        gsap.to(star, {
            opacity: 0.1,
            duration: animDuration,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: animDelay
        });
    }
    
    return starsContainer;
}

/**
 * Adds opening animations to a viewport
 * @param {HTMLElement} container - The viewport container
 * @param {HTMLElement} header - The header element
 * @param {HTMLElement} content - The content element (iframe)
 */
export function addOpeningAnimations(container, header, content) {
    const tl = gsap.timeline();
    tl.from(container, {
        opacity: 0,
        scale: 0.7,
        duration: 0.6,
        ease: "power2.out"
    });
    tl.from(header, {
        y: -50,
        opacity: 0,
        duration: 0.4,
        ease: "back.out(1.7)"
    }, "-=0.3");
    tl.from(content, {
        opacity: 0,
        y: 30,
        duration: 0.5,
        ease: "power2.out"
    }, "-=0.2");
    
    return tl;
}

/**
 * Adds a pulsing glow effect to a viewport container
 * @param {HTMLElement} container - The viewport container
 * @param {Object} options - Optional animation options
 */
export function addPulsingGlowEffect(container, options = {}) {
    const {
        color = 'rgba(255, 255, 204, 0.7)',
        intensity = '30px',
        duration = 2
    } = options;
    
    return gsap.to(container, {
        boxShadow: `0 0 ${intensity} ${color}`,
        repeat: -1,
        yoyo: true,
        duration: duration,
        ease: "sine.inOut"
    });
}

/**
 * Creates a closing animation for a viewport
 * @param {HTMLElement} container - The viewport container
 * @param {Function} onComplete - Function to call when animation completes
 */
export function createClosingAnimation(container, onComplete) {
    const tl = gsap.timeline({
        onComplete: onComplete
    });
    
    // First intensify the glow as if charging up
    tl.to(container, {
        boxShadow: '0 0 40px rgba(255, 255, 204, 0.9)',
        duration: 0.3,
        ease: "power1.in"
    });
    
    // Then fade out with a slight zoom effect
    tl.to(container, {
        opacity: 0,
        scale: 0.7,
        duration: 0.5,
        ease: "power2.in"
    }, "-=0.1");
    
    return tl;
}