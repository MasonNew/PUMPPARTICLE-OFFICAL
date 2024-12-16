import { useMemo } from 'react';
import * as THREE from 'three';
import { ParticleConfig } from '../config/particleConfig';

export function useParticleSystem(config: ParticleConfig) {
  return useMemo(() => {
    const positions = new Float32Array(config.particleCount * 3);
    const velocities = new Float32Array(config.particleCount * 3);
    const colors = new Float32Array(config.particleCount * 3);
    
    const attractors = new Array(config.attractorCount).fill(0).map((_, i) => ({
      position: new THREE.Vector3(
        (i - 1) * 2,
        Math.sin(i * Math.PI * 2 / config.attractorCount),
        Math.cos(i * Math.PI * 2 / config.attractorCount)
      ),
      axis: new THREE.Vector3(Math.random() - 0.5, 1, Math.random() - 0.5).normalize()
    }));

    // Initialize particles
    for (let i = 0; i < config.particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 5;
      positions[i3 + 1] = (Math.random() - 0.5) * 0.2;
      positions[i3 + 2] = (Math.random() - 0.5) * 5;

      const angle = Math.random() * Math.PI * 2;
      const speed = 0.05;
      velocities[i3] = Math.cos(angle) * speed;
      velocities[i3 + 1] = (Math.random() - 0.5) * speed;
      velocities[i3 + 2] = Math.sin(angle) * speed;

      // Initialize with random colors
      colors[i3] = Math.random();
      colors[i3 + 1] = Math.random();
      colors[i3 + 2] = Math.random();
    }

    return {
      positions,
      velocities,
      colors,
      attractors
    };
  }, [config.particleCount, config.attractorCount]);
}