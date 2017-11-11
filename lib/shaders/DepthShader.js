/**
 * @author meatbags / https://github.com/meatbags
 */

THREE.DepthShader = {
  shaderId: 'depthShader',
  uniforms: {},
  vertexShader: [
    'varying vec2 vUv;',
    'void main(){',
      'vUv = uv;',
      'gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
    '}'
  ].join('\n'),
  fragmentShader: [
    'varying vec2 vUv;',
    'void main() {',
      'gl_FragColor = vec4(vUv.x, 0.5, 0.5, 1.0);',
    '}'
  ].join('\n')
};
