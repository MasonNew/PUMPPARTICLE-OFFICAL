uniform float pointSize;
uniform float time;
attribute vec3 color;
varying vec3 vColor;
varying float vAlpha;

void main() {
  vColor = color;
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  
  // Dynamic size based on distance
  float distance = length(mvPosition.xyz);
  gl_PointSize = pointSize * (300.0 / distance);
  
  // Subtle pulsing effect
  vAlpha = 0.7 + 0.3 * sin(time + distance * 0.5);
}