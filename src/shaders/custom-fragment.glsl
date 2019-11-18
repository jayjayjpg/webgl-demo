uniform vec3 colorA;
uniform vec3 colorB;
varying vec3 vUv;

void main() {
  gl_FragColor = vec4(mix(colorB, colorA, vUv.z), 0.5);
}
