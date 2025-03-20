/*
 * File: section6.js
 * Purpose: Loads and initializes Section 6, 
 * Author(s): 
 * Date: 20 FEB 2025
 * Version: 1.0
 *
 * Description:
 * 
 *
 * Functions:
 * - loadSection2(): 
 */

import { loadModel } from './utils.js';

/*
 * Loads and initializes Section 2 by adding the NASA Logo model.
 * The model is positioned at a fixed offset from the camera for visibility.
 *
 * Parameters:
 * - scene: The Three.js scene where the model will be added.
 * - camera: The camera used for rendering and positioning context.
 * - sections: Array containing camera positions for each section.
 */
export function loadSection6(scene, camera, sections) {
  // const cameraPosition = sections[6];
  // const modelOffset = 30;

  // // Position the model slightly in front of the camera
  // const modelPosition = {
  //   x: cameraPosition.x,
  //   y: cameraPosition.y,
  //   z: cameraPosition.z - modelOffset
  // };

  // // Load the NASA Logo model into the scene
  // loadModel(
  //   "nasaLogo",                          // Model name
  //   "/res/models/nasaLogo.glb",          // Model file path
  //   modelPosition,                       // Position in the scene
  //   1,                                   // Scale factor
  //   { x: 0, y: 0, z: 0 },                // Initial rotation
  //   null,                                // No animation for now
  //   scene, 
  //   (model) => {
  //     console.log("NASA Logo loaded into Section 2");

  //     // Enable frustum culling for performance
  //     model.frustumCulled = true;

  //     /*
  //      * Ensure bounding spheres exist for all meshes within the model.
  //      * 
  //      * - **Frustum Culling Optimization**: Three.js uses bounding spheres to quickly determine
  //      *   whether an object is within the camera's view (the frustum). If a bounding sphere
  //      *   is entirely outside the frustum, the mesh can be skipped during rendering, improving performance.
  //      * 
  //      * - **Missing Bounding Spheres Issue**: Some imported models, especially from formats like GLTF/GLB,
  //      *   might not have precomputed bounding spheres. Without them, frustum culling can't be applied
  //      *   accurately, leading to either unnecessary rendering of off-screen objects or accidental culling.
  //      * 
  //      * - **Performance Impact**: Precomputing bounding spheres reduces the per-frame calculations needed,
  //      *   as Three.js can use simple geometric tests against the frustum instead of deeper mesh-level checks.
  //      */
  //     model.traverse((child) => {
  //       if (child.isMesh && child.geometry) { 
  //         if (!child.geometry.boundingSphere) {
  //           child.geometry.computeBoundingSphere();
  //           console.log("added bounding sphere to", child.name);
  //         }
  //       }
  //     });
  //     console.log("Is NASA Logo culled?", model.frustumCulled);
  //   }
  // );
}
