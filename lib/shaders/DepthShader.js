/**
 * @author meatbags / https://github.com/meatbags
 */

THREE.DepthShader = {
  uniforms: {
    'time': {value: 0}
  },
  vertexShader: [
    'varying vec3 pos;',
    'varying vec4 depth;',
    'uniform float time;',
    'void main(){',
      'float t = time;',
      'pos = position;',
      'depth = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
      'float mx = position.x + sin(position.x + t);',
      'float mz = position.z + cos(position.z + t);',
      'gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
    '}'
  ].join('\n'),
  fragmentShader: [
    'varying vec3 pos;',
    'varying vec4 depth;',
    'uniform float time;',
    'void main(){',
      'float d = min(1.0, (depth.w / 40.));',
      'float x = min(1.0, pos.y / 10.);',
      'float t = time;',
      'float v = 1.0 - min(1.0, sin(x + t));',
      'gl_FragColor = vec4(d, 0., x, 1.0);',
    '}'
  ].join('\n')
};

THREE.DepthShaderAlt = {
  uniforms: {
    'time': {value: 0}
  },
  vertexShader: [
    'varying vec3 pos;',
    'varying vec4 depth;',
    'void main(){',
      'pos = position;',
      'depth = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
      'gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
    '}'
  ].join('\n'),
  fragmentShader: [
    'varying vec3 pos;',
    'varying vec4 depth;',
    'uniform float time;',
    'void main(){',
      'float d = min(1.0, (depth.w / 100.));',
      'float x = ((depth.w - pos.y) / 100.) * 20.;',
      'float t = -time;',
      'float v = min(1.0, sin(x + t));',
      'gl_FragColor = vec4(d, 1.0, v, 1.);',
    '}'
  ].join('\n')
};
