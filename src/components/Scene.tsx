import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { ParticleSystem } from './ParticleSystem/ParticleSystem';

export function Scene() {
  return (
    <Canvas
      camera={{ position: [3, 5, 8], fov: 25 }}
      style={{ background: 'black' }}
    >
      <ParticleSystem />
      <OrbitControls 
        enableDamping
        dampingFactor={0.05}
        minDistance={0.1}
        maxDistance={50}
      />
    </Canvas>
  );
}