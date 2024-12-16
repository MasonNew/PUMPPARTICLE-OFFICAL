import { useEffect, useState } from 'react';
import * as THREE from 'three';

export function useParticleTexture() {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();
    
    textureLoader.load(
      '/pump.funlogo.png',
      (loadedTexture) => {
        loadedTexture.premultiplyAlpha = true;
        loadedTexture.needsUpdate = true;
        // Enable mipmapping for better scaling
        loadedTexture.minFilter = THREE.LinearMipMapLinearFilter;
        loadedTexture.magFilter = THREE.LinearFilter;
        setTexture(loadedTexture);
      },
      undefined,
      (error) => {
        console.error('Failed to load particle texture:', error);
        // Create fallback texture
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(32, 32, 28, 0, Math.PI * 2);
          ctx.fill();
        }
        const fallbackTexture = new THREE.CanvasTexture(canvas);
        fallbackTexture.premultiplyAlpha = true;
        fallbackTexture.minFilter = THREE.LinearMipMapLinearFilter;
        fallbackTexture.magFilter = THREE.LinearFilter;
        setTexture(fallbackTexture);
      }
    );

    return () => {
      if (texture) texture.dispose();
    };
  }, []);

  return texture;
}