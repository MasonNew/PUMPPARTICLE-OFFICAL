import * as THREE from 'three';
import { PARTICLE_CONFIG } from '../../config/particleConfig';
import { Attractor } from './types';

export function updateParticles(
  points: THREE.Points,
  positions: Float32Array,
  velocities: Float32Array,
  attractors: Attractor[],
  delta: number
) {
  const positionArray = points.geometry.attributes.position.array as Float32Array;
    
  for (let i = 0; i < PARTICLE_CONFIG.particleCount; i++) {
    const i3 = i * 3;
    
    let fx = 0, fy = 0, fz = 0;
    
    for (const attractor of attractors) {
      const dx = attractor.position.x - positionArray[i3];
      const dy = attractor.position.y - positionArray[i3 + 1];
      const dz = attractor.position.z - positionArray[i3 + 2];
      
      const distSq = dx * dx + dy * dy + dz * dz;
      const dist = Math.sqrt(distSq);
      
      if (dist < 0.1) continue;
      
      const force = (PARTICLE_CONFIG.attractorMass * PARTICLE_CONFIG.particleMass * 6.67e-11) / distSq;
      
      fx += (dx / dist) * force;
      fy += (dy / dist) * force;
      fz += (dz / dist) * force;
      
      const spinForce = force * PARTICLE_CONFIG.spinningStrength;
      fx += attractor.axis.y * dz * spinForce;
      fy += attractor.axis.z * dx * spinForce;
      fz += attractor.axis.x * dy * spinForce;
    }
    
    velocities[i3] = (velocities[i3] + fx * delta) * PARTICLE_CONFIG.damping;
    velocities[i3 + 1] = (velocities[i3 + 1] + fy * delta) * PARTICLE_CONFIG.damping;
    velocities[i3 + 2] = (velocities[i3 + 2] + fz * delta) * PARTICLE_CONFIG.damping;
    
    const speed = Math.sqrt(
      velocities[i3] * velocities[i3] +
      velocities[i3 + 1] * velocities[i3 + 1] +
      velocities[i3 + 2] * velocities[i3 + 2]
    );
    
    if (speed > PARTICLE_CONFIG.maxSpeed) {
      const scale = PARTICLE_CONFIG.maxSpeed / speed;
      velocities[i3] *= scale;
      velocities[i3 + 1] *= scale;
      velocities[i3 + 2] *= scale;
    }
    
    positionArray[i3] += velocities[i3] * delta;
    positionArray[i3 + 1] += velocities[i3 + 1] * delta;
    positionArray[i3 + 2] += velocities[i3 + 2] * delta;
    
    const halfBound = PARTICLE_CONFIG.boundSize / 2;
    positionArray[i3] = ((positionArray[i3] + halfBound) % PARTICLE_CONFIG.boundSize) - halfBound;
    positionArray[i3 + 1] = ((positionArray[i3 + 1] + halfBound) % PARTICLE_CONFIG.boundSize) - halfBound;
    positionArray[i3 + 2] = ((positionArray[i3 + 2] + halfBound) % PARTICLE_CONFIG.boundSize) - halfBound;
  }
  
  points.geometry.attributes.position.needsUpdate = true;
}