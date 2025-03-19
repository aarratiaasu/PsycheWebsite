import { World, Vector3 } from '@dimforge/rapier3d';

export const gravityPresets = {
    Earth: { x: 0, y: -9.81, z: 0 },
    Moon: { x: 0, y: -1.62, z: 0 },
    Mars: { x: 0, y: -3.71, z: 0 },
    Jupiter: { x: 0, y: -24.79, z: 0 },
    Psyche: { x: 0, y: -0.144, z: 0 },
    ZeroG: { x: 0, y: 0, z: 0 }
  };

  export let world = new World(new Vector3(gravityPresets.Earth.x, gravityPresets.Earth.y, gravityPresets.Earth.z));
  console.log("Rapier World created:", world);
  console.log("Gravity Vector:", world.gravity);

  export function updateGravity(preset, rigidBodies) {
    if (!(preset in gravityPresets)) {
      console.error(`Invalid gravity preset: ${preset}`);
      return;
    }
  
    const gravityScale = gravityPresets[preset];
  
    console.log(`Updating gravity to: ${preset}`);
    console.log(`Gravity Scale Value:`, gravityScale);

    for (let body of rigidBodies) {
      if (!body) {
        console.error("Found undefined body in rigidBodies list!");
        continue;
      }
  
    //   console.log("Applying gravity scale to:", body);
      body.setGravityScale(gravityScale, true);
    //   console.log(`Gravity scale applied to object:`, gravityScale());
    }
  
    console.log(`Gravity updated to: ${preset} (Scale: ${gravityScale})`);
  }
  
  