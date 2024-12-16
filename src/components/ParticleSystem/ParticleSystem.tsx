import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { PARTICLE_CONFIG } from '../../config/particleConfig';
import { useParticleSystem } from './useParticleSystem';
import { useParticleTexture } from './useParticleTexture';
import { createParticleMaterial } from './ParticleMaterial';
import { updateParticles } from './particlePhysics';

export function ParticleSystem() {
  const pointsRef = useRef<THREE.Points>(null);
  const { positions, velocities, colors, attractors } = useParticleSystem();
  const texture = useParticleTexture();

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  const material = useMemo(() => {
    return createParticleMaterial(texture, PARTICLE_CONFIG.particleSize);
  }, [texture]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    material.uniforms.time.value += delta;
    updateParticles(pointsRef.current, positions, velocities, attractors, delta);
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}