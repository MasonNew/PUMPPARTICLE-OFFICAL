import { useMemo } from 'react';
import * as THREE from 'three';
import { PARTICLE_CONFIG } from '../../config/particleConfig';
import { interpolateColors } from '../../utils/colorUtils';

export function useParticleSystem() {
  return useMemo(() => {
    const positions = new Float32Array(PARTICLE_CONFIG.particleCount * 3);
    const velocities = new Float32Array(PARTICLE_CONFIG.particleCount * 3);
    const colors = new Float32Array(PARTICLE_CONFIG.particleCount * 3);
    
    const attractors = new Array(PARTICLE_CONFIG.attractorCount).fill(0).map((_, i) => ({
      position: new THREE.Vector3(
        (i - 1) * 2,
        Math.sin(i * Math.PI * 2 / PARTICLE_CONFIG.attractorCount),
        Math.cos(i * Math.PI * 2 / PARTICLE_CONFIG.attractorCount)
      ),
      axis: new THREE.Vector3(Math.random() - 0.5, 1, Math.random() - 0.5).normalize()
    }));

    for (let i = 0; i < PARTICLE_CONFIG.particleCount; i++) {
      const i3 = i * 3;
      
      // Position initialization
      positions[i3] = (Math.random() - 0.5) * 5;
      positions[i3 + 1] = (Math.random() - 0.5) * 0.2;
      positions[i3 + 2] = (Math.random() - 0.5) * 5;

      // Velocity initialization
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.05;
      velocities[i3] = Math.cos(angle) * speed;
      velocities[i3 + 1] = (Math.random() - 0.5) * speed;
      velocities[i3 + 2] = Math.sin(angle) * speed;

      // Color initialization
      const color = interpolateColors(
        PARTICLE_CONFIG.colors.start,
        PARTICLE_CONFIG.colors.end,
        Math.random()
      );
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    return {
      positions,
      velocities,
      colors,
      attractors
    };
  }, []);
}