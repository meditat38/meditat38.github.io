import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


//import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
//import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
//import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
//import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

//import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
//import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import { NodeToyMaterial } from '@nodetoy/three-nodetoy';

//Create a Three.JS Scene
const scene = new THREE.Scene();
//scene.background = new THREE.Color(0x525252)
//create a new camera with positions and angles
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//Keep track of the mouse position, so we can make the eye move
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

//Keep the 3D object on a global variable so we can access it later
let object;

//OrbitControls allow the camera to move around the scene
//let controls;

//Set which object to render
let objToRender = 'text';

//Add Node Toy material
let newMaterial = new NodeToyMaterial({
  url: "https://draft.nodetoy.co/gVik39zC4oHZnols"
});

//var vertCode = document.getElementById("vertexShader").textContent;
//var fragCode = document.getElementById("fragmentShader").textContent;
//const newMaterial = new THREE.ShaderMaterial( {
// 	uniforms: [{
//     "name": "_normalMatrix",
//     "type": "mat3",
//     "value": {
//       "elements": [
//         1,
//         0,
//         0,
//         0,
//         1,
//         0,
//         0,
//         0,
//         1
//       ]
//     }
//   },
//   {
//     "name": "_viewMatrix",
//     "type": "mat4",
//     "value": {
//       "elements": [
//         1,
//         0,
//         0,
//         0,
//         0,
//         1,
//         0,
//         0,
//         0,
//         0,
//         1,
//         0,
//         0,
//         0,
//         0,
//         1
//       ]
//     }
//   },
//   {
//     "name": "nodeUniform3",
//     "type": "texture",
//     "value": "/images/noiseTexture.png"
//   },
//   {
//     "name": "_time",
//     "type": "float",
//     "value": 0
//   },
//   {
//     "name": "nodeUniform4",
//     "type": "texture",
//     "value": "/images/noiseTexture.png"
//   },
//   {
//     "name": "nodeUniform5",
//     "type": "texture",
//     "value": "/images/noiseTexture.png"
//   },
//   {
//     "name": "nodeUniform6",
//     "type": "texture",
//     "value": "/images/noiseTexture.png"
//   },
//   {
//     "name": "_worldToObjMatrix",
//     "type": "mat4",
//     "value": {
//       "elements": [
//         1,
//         0,
//         0,
//         0,
//         0,
//         1,
//         0,
//         0,
//         0,
//         0,
//         1,
//         0,
//         0,
//         0,
//         0,
//         1
//       ]
//     }
//   },
//   {
//     "name": "_viewDir",
//     "type": "vec3",
//     "value": {
//       "x": 0,
//       "y": 0,
//       "z": 0
//     }
//   },
//   {
//     "name": "nodeUniform0",
//     "type": "texture",
//     "value": "/images/noiseTexture.png"
//   },
//   {
//     "name": "_time",
//     "type": "float",
//     "value": 1
//   },
//   {
//     "name": "nodeUniform1",
//     "type": "texture",
//     "value": "/images/noiseTexture.png"
//   },
//   {
//     "name": "nodeUniform2",
//     "type": "texture",
//     "value": "/images/noiseTexture.png"
//   }],
  
 	//vertexShader: document.getElementById( 'vertexShader' ).text,
 	//fragmentShader: document.getElementById( 'fragmentShader' ).text,
   //vertexShader: vertCode, 
   //fragmentShader: fragCode
 //} );

// //Instantiate a loader for the .gltf file
 const loader = new GLTFLoader();

// //Load the file
 loader.load(
   `/dist/models/${objToRender}/scene2.gltf`,
   function (gltf) {
     //If the file is loaded, add it to the scene
     object = gltf.scene;
     object.traverse((o) => {
       if (o.isMesh) o.material = newMaterial;
     });
     scene.add(object);
   },
   function (xhr) {
     //While it is loading, log the progress
     console.log((xhr.loaded / xhr.total * 100) + '% loaded');
   },
   function (error) {
     //If there is an error, log it
     console.error(error);
   }
 );


//Instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

//Add the renderer to the DOM
document.getElementById("container3D").appendChild(renderer.domElement);

//Set how far the camera will be from the 3D model
camera.position.z = 200;

//Add lights to the scene, so we can actually see the 3D model
//const topLight = new THREE.DirectionalLight(0xffffff, 40); // (color, intensity)
//topLight.position.set(-100, 200, 500) //top-left-ish
//topLight.castShadow = true;
//scene.add(topLight);

//This adds controls to the camera, so we can rotate / zoom it with the mouse
//if (objToRender === "dino") {
//  controls = new OrbitControls(camera, renderer.domElement);
//}

//PostProcessing
//const composer = new EffectComposer(renderer)
//const renderPass = new RenderPass(scene, camera)
//composer.addPass(renderPass)
//const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
//bloomPass.threshold = 0.5;
//bloomPass.strength = 0.3;
//bloomPass.radius = 1;
//composer.addPass(bloomPass)


//Render the scene
function animate() {
  requestAnimationFrame(animate);
  //Here we could add some code to update the scene, adding some automatic movement

  //Make the eye move
  if (object && objToRender === "text") {
    //I've played with the constants here until it looked good 
    object.rotation.y = -1.85 + mouseX/2 / window.innerWidth;
    object.rotation.x = -0.3 + mouseY/2 / window.innerHeight;
  }
  //composer.render()
  renderer.render(scene, camera);
  NodeToyMaterial.tick();
}

//Add a listener to the window, so we can resize the window and the camera
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
});

//add mouse position listener, so we can make the eye move
document.onmousemove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
}

//Start the 3D rendering
animate();