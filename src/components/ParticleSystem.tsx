import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useControls } from 'leva';
import { DEFAULT_CONFIG } from '../config/particleConfig';
import { useParticleSystem } from '../hooks/useParticleSystem';

export function ParticleSystem() {
  const config = useControls({
    attractorMass: { value: DEFAULT_CONFIG.attractorMass, min: 1e6, max: 1e8, step: 1e6 },
    particleMass: { value: DEFAULT_CONFIG.particleMass, min: 1e3, max: 1e5, step: 1e3 },
    maxSpeed: { value: DEFAULT_CONFIG.maxSpeed, min: 1, max: 20, step: 0.1 },
    spinningStrength: { value: DEFAULT_CONFIG.spinningStrength, min: 0, max: 10, step: 0.1 },
    boundSize: { value: DEFAULT_CONFIG.boundSize, min: 4, max: 20, step: 0.5 },
    particleSize: { value: DEFAULT_CONFIG.particleSize, min: 0.001, max: 0.1, step: 0.001 },
    damping: { value: DEFAULT_CONFIG.damping, min: 0.9, max: 1, step: 0.001 }
  });

  const pointsRef = useRef<THREE.Points>(null);
  const { positions, velocities, colors, attractors } = useParticleSystem(DEFAULT_CONFIG);

  const geometry = useRef(new THREE.BufferGeometry()).current;
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

  const material = useRef(new THREE.PointsMaterial({
    size: config.particleSize,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false
  })).current;

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < DEFAULT_CONFIG.particleCount; i++) {
      const i3 = i * 3;
      
      let fx = 0, fy = 0, fz = 0;
      
      for (const attractor of attractors) {
        const dx = attractor.position.x - positions[i3];
        const dy = attractor.position.y - positions[i3 + 1];
        const dz = attractor.position.z - positions[i3 + 2];
        
        const distSq = dx * dx + dy * dy + dz * dz;
        const dist = Math.sqrt(distSq);
        
        if (dist < 0.1) continue;
        
        const force = (config.attractorMass * config.particleMass * 6.67e-11) / distSq;
        
        fx += (dx / dist) * force;
        fy += (dy / dist) * force;
        fz += (dz / dist) * force;
        
        const spinForce = force * config.spinningStrength;
        fx += attractor.axis.y * dz * spinForce;
        fy += attractor.axis.z * dx * spinForce;
        fz += attractor.axis.x * dy * spinForce;
      }
      
      velocities[i3] = (velocities[i3] + fx * delta) * config.damping;
      velocities[i3 + 1] = (velocities[i3 + 1] + fy * delta) * config.damping;
      velocities[i3 + 2] = (velocities[i3 + 2] + fz * delta) * config.damping;
      
      const speed = Math.sqrt(
        velocities[i3] * velocities[i3] +
        velocities[i3 + 1] * velocities[i3 + 1] +
        velocities[i3 + 2] * velocities[i3 + 2]
      );
      
      if (speed > config.maxSpeed) {
        const scale = config.maxSpeed / speed;
        velocities[i3] *= scale;
        velocities[i3 + 1] *= scale;
        velocities[i3 + 2] *= scale;
      }
      
      positions[i3] += velocities[i3] * delta;
      positions[i3 + 1] += velocities[i3 + 1] * delta;
      positions[i3 + 2] += velocities[i3 + 2] * delta;
      
      const halfBound = config.boundSize / 2;
      positions[i3] = ((positions[i3] + halfBound) % config.boundSize) - halfBound;
      positions[i3 + 1] = ((positions[i3 + 1] + halfBound) % config.boundSize) - halfBound;
      positions[i3 + 2] = ((positions[i3 + 2] + halfBound) % config.boundSize) - halfBound;
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}