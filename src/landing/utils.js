import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import gsap from 'gsap';

// Model Cache to Avoid Reloading
const modelCache = new Map();

// Function to Create Text Mesh
export function createTextMesh(text, position, rotation, size=1.5, scene) {
    const fontLoader = new FontLoader();
    fontLoader.load('/res/font/DroidSans_Regular.json', (font) => {
        const textGeometry = new TextGeometry(text, {
            font: font,
            size: size,
            depth: 0.3,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 5
        });

        const textMaterial = new THREE.ShaderMaterial({
            uniforms: {
                color1: { value: new THREE.Color(90 / 255, 39 / 255, 82 / 255) },
                color2: { value: new THREE.Color(49 / 255, 33 / 255, 70 / 255) },
                color3: { value: new THREE.Color(164 / 255, 64 / 255, 92 / 255) },
                color4: { value: new THREE.Color(239 / 255, 89 / 255, 101 / 255) },
                color5: { value: new THREE.Color(245 / 255, 124 / 255, 51 / 255) },
                color6: { value: new THREE.Color(249 / 255, 159 / 255, 0 / 255) },
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                varying vec2 vUv;
                uniform vec3 color1, color2, color3, color4, color5, color6;
        
                void main() {
                    vec3 gradient;
                    if (vUv.y < 0.2) gradient = mix(color1, color2, vUv.y / 0.2);
                    else if (vUv.y < 0.4) gradient = mix(color2, color3, (vUv.y - 0.2) / 0.2);
                    else if (vUv.y < 0.6) gradient = mix(color3, color4, (vUv.y - 0.4) / 0.2);
                    else if (vUv.y < 0.8) gradient = mix(color4, color5, (vUv.y - 0.6) / 0.2);
                    else gradient = mix(color5, color6, (vUv.y - 0.8) / 0.2);
                    
                    gradient *= 0.8; 
                    
                    gl_FragColor = vec4(gradient, 1.0);
                }
            `,
        });

        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.set(position.x, position.y, position.z);
        textMesh.rotation.set(rotation.x, rotation.y, rotation.z);

        scene.add(textMesh);
    });
}


export function loadModel(name, path, position, scale, rotation, animation, scene) {
    if (modelCache.has(name)) {
        const model = modelCache.get(name);
        model.position.set(position.x, position.y, position.z);
        model.scale.set(scale, scale, scale);
        model.rotation.set(rotation.x, rotation.y, rotation.z);
        scene.add(model);
        animateModel(model, animation);
        return model;
    }

    const loader = new GLTFLoader();
    loader.load(path, (gltf) => {
        const model = gltf.scene;
        model.position.set(position.x, position.y, position.z);
        model.scale.set(scale, scale, scale);
        model.rotation.set(rotation.x, rotation.y, rotation.z);

        modelCache.set(name, model);
        scene.add(model);
        
        animateModel(model, animation);
    }, undefined, (error) => {
        console.error(`Error loading model ${name}:`, error);
    });
}

// Function to Animate Model with GSAP
function animateModel(model, animation) {
    if (animation?.position) {
        gsap.to(model.position, { 
            x: animation.position.x,
            y: animation.position.y,
            z: animation.position.z,
            duration: animation.position.duration || 3,
            ease: animation.position.ease || "power2.out"
        });
    }

    if (animation?.rotation) {
        gsap.to(model.rotation, { 
            x: model.rotation.x + (animation.rotation.x || 0),
            y: model.rotation.y + (animation.rotation.y || 0),
            z: model.rotation.z + (animation.rotation.z || 0),
            duration: animation.rotation.duration || 45,
            ease: animation.rotation.ease || "linear",
            repeat: animation.rotation.repeat ?? -1
        });
    }
}

const interactiveTextMeshes = []; 
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let hoveredText = null; 

export function createMenu(menuItems, referencePosition, referenceRotation, scene) {
    const menuGroup = new THREE.Group(); 
    menuGroup.position.set(referencePosition.x, referencePosition.y, referencePosition.z);
    menuGroup.rotation.set(referenceRotation.x, referenceRotation.y, referenceRotation.z);

    const menuSpacing = 2;
    const startY = 0; 

    menuItems.forEach((item, index) => {
        const menuPosition = { x: 0, y: startY - index * menuSpacing, z: 0 };
        const menuItem = createMenuItem(item.text, menuPosition, scene, item.onClick);
        menuGroup.add(menuItem); 
    });

    scene.add(menuGroup);
}


export function createMenuItem(text, position, scene, onClick) {
    const fontLoader = new FontLoader();
    const textMesh = new THREE.Mesh();

    fontLoader.load('/res/font/DroidSans_Regular.json', (font) => {
        const textGeometry = new TextGeometry(text, {
            font: font,
            size: 0.5,
            depth: 0.3,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 5
        });

        const textMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
        textMesh.geometry = textGeometry;
        textMesh.material = textMaterial;
        textMesh.position.set(position.x+1, position.y-1.5, position.z);
        textMesh.userData.onClick = onClick;
        textMesh.userData.originalColor = textMaterial.color.getHex();

        interactiveTextMeshes.push(textMesh);
    });

    return textMesh;
}


function onMouseMove(event, camera, renderer) {
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(interactiveTextMeshes);

    if (intersects.length > 0) {
        const intersectedText = intersects[0].object;

        if (hoveredText !== intersectedText) {
            if (hoveredText) {
                gsap.to(hoveredText.material.color, { 
                    r: (hoveredText.userData.originalColor >> 16 & 255) / 255,
                    g: (hoveredText.userData.originalColor >> 8 & 255) / 255,
                    b: (hoveredText.userData.originalColor & 255) / 255,
                    duration: 0.3 
                });
                gsap.to(hoveredText.scale, { x: 1, y: 1, z: 1, duration: 0.3 });
            }

            hoveredText = intersectedText;
            hoveredText.userData.originalColor = hoveredText.material.color.getHex(); 

            gsap.to(hoveredText.material.color, { 
                r: 1, g: 0.7, b: 0, 
                duration: 0.3 
            });
            gsap.to(hoveredText.scale, { x: 1.2, y: 1.2, z: 1.2, duration: 0.3 });
        }
    } else {
        if (hoveredText) {
            gsap.to(hoveredText.material.color, { 
                r: (hoveredText.userData.originalColor >> 16 & 255) / 255,
                g: (hoveredText.userData.originalColor >> 8 & 255) / 255,
                b: (hoveredText.userData.originalColor & 255) / 255,
                duration: 0.3
            });
            gsap.to(hoveredText.scale, { x: 1, y: 1, z: 1, duration: 0.3 });
            hoveredText = null;
        }
    }
}



function onMouseClick(event, camera) {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(interactiveTextMeshes);

    if (intersects.length > 0) {
        const clickedText = intersects[0].object;
        if (clickedText.userData.onClick) {
            clickedText.userData.onClick();
        }
    }
}

export function enableTextInteractivity(camera, scene, renderer) {
    window.addEventListener("mousemove", (event) => onMouseMove(event, camera, renderer));
    window.addEventListener("click", (event) => onMouseClick(event, camera));
}


export function loadBadge(scene) {
    // load the psyche icon/badge into the scene
}

const raycaster1 = new THREE.Raycaster();
const mouse1 = new THREE.Vector2();
let isHoveringAsteroid = false;
let originalCameraPosition = null;

// Function to Detect Model Hover and Move Camera
export function enableModelHoverEffect(camera, scene) {
    window.addEventListener("mousemove", (event) => {
        if (!asteroidModel) return; // Ensure the model is loaded

        // Convert mouse position to normalized device coordinates
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        // Cast a ray to check for intersection
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(asteroidModel, true);

        if (intersects.length > 0) {
            if (!isHoveringAsteroid) {
                isHoveringAsteroid = true;
                originalCameraPosition = { ...camera.position };

                // Move camera slightly right & up
                gsap.to(camera.position, {
                    x: camera.position.x + 3,
                    y: camera.position.y + 2,
                    duration: 1,
                    ease: "power2.out"
                });
            }
        } else if (isHoveringAsteroid) {
            isHoveringAsteroid = false;

            // Reset camera position
            gsap.to(camera.position, {
                x: originalCameraPosition.x,
                y: originalCameraPosition.y,
                duration: 1,
                ease: "power2.out"
            });
        }
    });
}
