uniform vec3 uColor;
uniform sampler2D uTexture;
varying float vElevation;

// varying float vRandom;
varying vec2 vUv;

void main() {
  // gl_FragColor = vec4(vRandom * 0.7, 0, 1, 1.0);
  vec4 textureColor = texture2D(uTexture, vUv);
  textureColor.rgb += vElevation * 2.0 + 0.3;
  gl_FragColor = textureColor;
}

// gl_FragColor = rgba