import * as THREE from 'three';

export function createNebula() {
    const nebulaShaderMaterial = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0.0 },
            color1: { value: new THREE.Color(0x551A8B) }, // Deep Purple
            color2: { value: new THREE.Color(0x228B22) }, // Green
            color3: { value: new THREE.Color(0xFF4500) }, // Orange-Red
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
            uniform float time;
            uniform vec3 color1;
            uniform vec3 color2;
            uniform vec3 color3;

            float noise(vec2 p) {
                return sin(p.x * 10.0 + time * 0.5) * sin(p.y * 10.0 + time * 0.7);
            }

            void main() {
                float n = noise(vUv);
                vec3 nebulaColor = mix(color1, color2, n);
                nebulaColor = mix(nebulaColor, color3, smoothstep(0.3, 0.7, n));

                gl_FragColor = vec4(nebulaColor, smoothstep(0.2, 0.8, n)); // Transparency
            }
        `,
        transparent: true,
        depthWrite: false
    });

    const nebulaPlane = new THREE.Mesh(
        new THREE.PlaneGeometry(15, 10, 32, 32),
        nebulaShaderMaterial
    );
    nebulaPlane.position.set(0, 0, -5); // Set nebula behind scene elements

    return { nebulaPlane, nebulaShaderMaterial }; // Return both objects
}
