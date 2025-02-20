import * as THREE from 'three';
import { loadModel } from './utils.js';

export function loadSection2(scene, camera, sections) {
    const cameraPosition = sections[2];
    const modelOffset = 30;

    const modelPosition = {
        x: cameraPosition.x,
        y: cameraPosition.y,
        z: cameraPosition.z - modelOffset
    };

    loadModel(
        "nasaLogo",
        "/res/models/nasaLogo.glb",
        modelPosition,
        1, 
        { x: 0, y: 0, z: 0 },
        null,
        scene,
        (model) => {
            console.log("NASA Logo loaded into Section 2");

            model.frustumCulled = true;

            model.traverse((child) => {
                if (child.isMesh && child.geometry) { 
                    if (!child.geometry.boundingSphere) {
                        child.geometry.computeBoundingSphere();
                    }
                }
            });

            const frustum = new THREE.Frustum();
            const cameraViewProjectionMatrix = new THREE.Matrix4();

            // Frustum testing loop
            function testFrustum() {
                camera.updateMatrixWorld();
                cameraViewProjectionMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
                frustum.setFromProjectionMatrix(cameraViewProjectionMatrix);

                if (!frustum.intersectsObject(model)) {
                    console.log("NASA Logo is outside the frustum and should be culled.");
                } else {
                    console.log("NASA Logo is inside the frustum and will render.");
                }

                requestAnimationFrame(testFrustum);
            }

            testFrustum();
        }
    );
}
