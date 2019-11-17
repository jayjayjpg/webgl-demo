import { WEBGL } from 'three/examples/jsm/WebGL.js';
import * as THREE from 'three';
import lavaImg from './textures/lava/lavatile.jpg';
import cloudImg from './textures/lava/cloud.png';
import XFragment from './shaders/lava-fragment.glsl';
import XVertex from './shaders/lava-vertex.glsl';

if ( WEBGL.isWebGL2Available() === false ) {
  document.body.appendChild( WEBGL.getWebGL2ErrorMessage() );
} else {
  renderThreeJSExample();
}

function renderThreeJSExample() {
  // initial setup of the scene
  var scene = new THREE.Scene();

  var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  var canvas = document.createElement('canvas');
  var context = canvas.getContext('webgl2', { alpha: false });

  var renderer = new THREE.WebGLRenderer({ canvas: canvas, context: context });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  renderer.autoClear = false;

  var clock = new THREE.Clock();
  var textureLoader = new THREE.TextureLoader();

  var uniforms = {
    "fogDensity": { value: 0.25 },
    "fogColor": { value: new THREE.Vector3( 0, 0, 0 ) },
    "time": { value: 1.0 },
    "uvScale": { value: new THREE.Vector2( 2.0, 1.0 ) },
    "texture1": { value: textureLoader.load( cloudImg ) },
    "texture2": { value: textureLoader.load( lavaImg ) }
  };

  uniforms[ "texture1" ].value.wrapS = uniforms[ "texture1" ].value.wrapT = THREE.RepeatWrapping;
  uniforms[ "texture2" ].value.wrapS = uniforms[ "texture2" ].value.wrapT = THREE.RepeatWrapping;
  // adding things to the Scene
  // var geometry = new THREE.BoxGeometry(1,1,1);

  var vertexShader = XVertex;
  var fragmentShader = XFragment;

  // var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  var material = new THREE.ShaderMaterial({
    uniforms,
  	vertexShader,
  	fragmentShader,
  });

  var geometry = new THREE.TorusBufferGeometry(0.65, 0.3, 60, 30);

  var cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  camera.position.z = 5;

  var animate = function() {
    requestAnimationFrame(animate);
    cube.rotation.x -= 0.09;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  }
  animate();
  console.log("animate 1...");
}
