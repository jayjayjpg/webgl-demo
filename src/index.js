import { WEBGL } from 'three/examples/jsm/WebGL.js';
import { OutlineEffect } from 'three/examples/jsm/effects/OutlineEffect';
import * as THREE from 'three';
import lavaImg from './textures/lava/lavatile.jpg';
import cloudImg from './textures/lava/cloud.png';
import XVertex from './shaders/custom2-vertex.glsl';
import XFragment from './shaders/custom2-fragment.glsl';

if ( WEBGL.isWebGL2Available() === false ) {
  document.body.appendChild( WEBGL.getWebGL2ErrorMessage() );
} else {
  renderThreeJSExample();
}

function renderThreeJSExample() {
  // initial setup of the scene
  var scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffe7ff);

  var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  var canvas = document.createElement('canvas');
  var context = canvas.getContext('webgl2', { alpha: false });

  var renderer = new THREE.WebGLRenderer({ canvas: canvas, context: context });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  renderer.autoClear = false;

  var clock = new THREE.Clock();
  var textureLoader = new THREE.TextureLoader();

  // var uniforms = {
  //  "fogDensity": { value: 0.25 },
  //  "fogColor": { value: new THREE.Vector3( 0, 0, 0 ) },
  //  "time": { value: 1.0 },
  //   "uvScale": { value: new THREE.Vector2( 2.0, 1.0 ) },
  // "texture1": { value: textureLoader.load( cloudImg ) },
    // "texture2": { value: textureLoader.load( lavaImg ) }
//  };

  // uniforms[ "texture1" ].value.wrapS = uniforms[ "texture1" ].value.wrapT = THREE.RepeatWrapping;
  // uniforms[ "texture2" ].value.wrapS = uniforms[ "texture2" ].value.wrapT = THREE.RepeatWrapping;
  // adding things to the Scene
  var geometry = new THREE.BoxGeometry(1,1,1);

  var vertexShader = XVertex;
  var fragmentShader = XFragment;
  let uniforms = {
    glColor: {type: 'vec3', value: new THREE.Color(0xDD77DD)},
    colorA: {type: 'vec3', value: new THREE.Color(0x74ebd5)}
  };

 // var material = new THREE.MeshBasicMaterial({ color: 0xff00ff });
 // var material = new THREE.MeshLambertMaterial({ color: 0xff00ff });
 var material = new THREE.MeshToonMaterial({
    //uniforms,
  	//vertexShader,
  	// fragmentShader,
    color: 0xdd77dd,
    shininess: Math.pow(2, 7),
    reflectivity: 2,
  });

  // var geometry = new THREE.TorusBufferGeometry(0.65, 0.3, 60, 30);

  var cube = new THREE.Mesh(geometry, material);

  /* var triangleGeometry = new THREE.Geometry();
  triangleGeometry.vertices.push(new THREE.Vector3(1, 1, 0));
  triangleGeometry.vertices.push(new THREE.Vector3(3, 1, 0));
  triangleGeometry.vertices.push(new THREE.Vector3(3, 3, 0));
  triangleGeometry.faces.push(new THREE.Face3(0, 1, 2));

  var triangleMaterial = new THREE.MeshBasicMaterial({
    color: 0x2685AA,
    side: THREE.DoubleSide,
  });

  var triangleMesh = new THREE.Mesh(triangleGeometry, triangleMaterial);

  scene.add(triangleMesh); */
  scene.add(cube);

  let pointLight = new THREE.PointLight(0xdddddd);
  pointLight.position.set(1,1,1);
  scene.add(pointLight);
  let ambientLight = new THREE.AmbientLight(0x505050);
  scene.add(ambientLight);

  camera.position.z = 5;

  let effect = new OutlineEffect(renderer);

  var animate = function() {
    requestAnimationFrame(animate);
    cube.rotation.x -= 0.002;
    cube.rotation.y += 0.001;
    effect.render(scene, camera);
  }
  animate();
  console.log("animate 1...");
}
