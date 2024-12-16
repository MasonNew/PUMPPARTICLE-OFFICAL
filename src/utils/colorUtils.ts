import * as THREE from 'three';

export function interpolateColors(colorA: string, colorB: string, amount: number): THREE.Color {
  const colorObj1 = new THREE.Color(colorA);
  const colorObj2 = new THREE.Color(colorB);
  return new THREE.Color().lerpColors(colorObj1, colorObj2, amount);
}