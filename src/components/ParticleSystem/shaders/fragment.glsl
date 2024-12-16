uniform sampler2D particleTexture;
varying vec3 vColor;
varying float vAlpha;

void main() {
  vec4 texColor = texture2D(particleTexture, gl_PointCoord);
  gl_FragColor = vec4(vColor * texColor.rgb, texColor.a * vAlpha);
}