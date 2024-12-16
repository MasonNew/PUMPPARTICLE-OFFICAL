import * as THREE from 'three';

const textureLoader = new THREE.TextureLoader();

export const loadTexture = (url: string): Promise<THREE.Texture> => {
  return new Promise((resolve, reject) => {
    textureLoader.load(
      url,
      (texture) => {
        texture.premultiplyAlpha = true;
        resolve(texture);
      },
      undefined,
      reject
    );
  });
};