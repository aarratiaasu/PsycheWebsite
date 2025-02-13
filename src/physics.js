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

  export function updateGravity(preset) {
    if(gravityPresets[preset]) {
        const { x, y, z}
    }
  }