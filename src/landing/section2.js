import { createTextMesh } from './utils.js'

export function loadSection2(scene, camera) {
    const mainTextPosition = { x: 10, y: 38, z: -3 }; 
    const mainTextRotation = { x: 0.20, y: 0, z: 0 };    
    return new Promise((resolve, reject) => {
        try {
            const psycheText = 
                "16 Psyche is a giant asteroid in our solar system!\n" +
                "    Explore this page to learn about 16 Psyche,\n" +
                "     its orbit, origin, and what makes it unique!\n";        
            createTextMesh(psycheText, mainTextPosition, mainTextRotation, .75, scene);
            resolve();
        } catch (error) {
            reject(error);
        }
    })
    .then(() => {
        console.log("Section 2 loaded successfully.");
    })
    .catch((error) => {
        console.error("Error loading Section 2:", error);
    });
}



/* 
Psyche is a giant asteroid in our solar system, about three times farther from the Sun than Earth. 
Research shows Psyche may be a mix of rock and metal, with metal making up 30-60% of its volume. 
It has a bumpy, cratered surface and might be the leftover core of an early planet, 
helping us learn how rocky planets like Earth formed. 

It orbits the Sun between Mars and Jupiter, taking five years to go around once and spinning every four hours. 
NASA’s Psyche mission will be the first to explore this mysterious asteroid up close!
*/
