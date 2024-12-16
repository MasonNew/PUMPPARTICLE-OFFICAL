import * as THREE from 'three';

export function createParticleMaterial(texture: THREE.Texture | null, particleSize: number) {
  return new THREE.ShaderMaterial({
    uniforms: {
      particleTexture: { value: texture },
      pointSize: { value: particleSize },
      time: { value: 0 }
    },
    vertexShader: `
      uniform float pointSize;
      uniform float time;
      attribute vec3 color;
      varying vec3 vColor;
      varying float vAlpha;

      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        
        float distance = length(mvPosition.xyz);
        gl_PointSize = pointSize * (300.0 / distance);
        
        vAlpha = 0.7 + 0.3 * sin(time + distance * 0.5);
      }
    `,
    fragmentShader: `
      uniform sampler2D particleTexture;
      varying vec3 vColor;
      varying float vAlpha;

      void main() {
        vec4 texColor = texture2D(particleTexture, gl_PointCoord);
        gl_FragColor = vec4(vColor * texColor.rgb, texColor.a * vAlpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
}