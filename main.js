import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//Keep track of the mouse position, so we can make the object move
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let object;
let object2;

const loadingManager = new THREE.LoadingManager( () => {
	
  const loadingScreen = document.getElementById( 'loading-screen' );
  loadingScreen.classList.add( 'fade-out' );
  
  // optional: remove loader from DOM via event listener
  loadingScreen.addEventListener( 'transitionend', onTransitionEnd );
  
} );

let noiseTexture = new THREE.TextureLoader(loadingManager).load('images/noise3.png' );
noiseTexture.wrapping = THREE.RepeatWrapping;

function vertexShader() {
  return `
    varying vec2 vUv;
    varying float noiseR;
    varying float noiseG;
    varying float noiseB;
    varying float disp;
    varying vec3 fNormal;
    uniform sampler2D texture1;
    uniform float dispScale;
    uniform float size;
    uniform float time;
    uniform float offset;
    varying vec3 vPositionW;
		varying vec3 vNormalW;
    uniform vec3 colorr;
    varying vec3 vColor;
    
    void main() {

      vUv = uv;
      fNormal = normal;
      vColor = colorr;

      vec4 noiseTexR = texture2D( texture1, vec2(0.5+time+vUv.x*0.0,vUv.y*size) );
      vec4 noiseTexG = texture2D( texture1, vec2(0.5+time+offset+vUv.x*0.0,vUv.y*size) );
      vec4 noiseTexB = texture2D( texture1, vec2(0.5+time+offset+offset+vUv.x*0.0,vUv.y*size) );

      noiseR = noiseTexR.r;
      noiseG = noiseTexG.g;
      noiseB = noiseTexB.b;
      float noise = (noiseR + noiseG + noiseB) * 0.33333333;

      disp = dispScale * (texture2D( texture1, vec2(0.5+time+vUv.x*0.0,vUv.y*size) ).r);
      float disp2 = -1.5 * dispScale * (texture2D( texture1, vec2(0.5+time+offset+vUv.x*0.0,vUv.y*size) ).r);
      float disp3 = (disp + disp2);


      vec3 newPosition = position + normal * (noise * disp3);

      gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );

      vPositionW = vec3( vec4( position, 1.0 ) * modelMatrix);
		  vNormalW = normalize( vec3( vec4( normal, 0.0 ) * modelMatrix ) );

    }
  `
}
function fragmentShader() {
  return `
    varying vec2 vUv;
    varying float noiseR;
    varying float noiseG;
    varying float noiseB;
    varying vec3 fNormal;
    uniform sampler2D texture1;
    uniform float time;
    uniform float offset;
    uniform float size;
    varying vec3 vPositionW;
		varying vec3 vNormalW;
    varying vec3 vColor;

    void main( void ) {
      vec4 noiseTexR = texture2D( texture1, vec2(0.5+time+vUv.x*0.0,vUv.y*size) );
      vec4 noiseTexG = texture2D( texture1, vec2(0.5+time+offset+vUv.x*0.0,vUv.y*size) );
      vec4 noiseTexB = texture2D( texture1, vec2(0.5+time+offset+offset+vUv.x*0.0,vUv.y*size) );

      vec3 color = vec3(-noiseTexR.r+1.0, -noiseTexG.g+1.0, -noiseTexB.b+1.0);

			vec3 viewDirectionW = normalize(cameraPosition - vPositionW);
			float fresnelTerm = dot(viewDirectionW, vNormalW);
			fresnelTerm = clamp(0.4 - fresnelTerm, 0., 1.);

      gl_FragColor = vec4(color * fresnelTerm, 1.0 );

    }
  `
}
let newMaterial = new THREE.ShaderMaterial( {
  uniforms: {
    texture1: { type: "t", value: noiseTexture },
    dispScale: { type: "f", value: 8.0 },
    size: { type: "f", value: 1.0 },
    time: {type:"f", value: 0.0},
    offset: {type:"f", value: 0.00075}
  },
  vertexShader: vertexShader(),
  fragmentShader: fragmentShader()

} );
let newMaterial2 = new THREE.ShaderMaterial( {
  uniforms: {
    texture1: { type: "t", value: noiseTexture },
    dispScale: { type: "f", value: 2.0 },
    size: { type: "f", value: 1.0 },
    time: {type:"f", value: 0.0},
    offset: {type:"f", value: 0.0005}
  },
  vertexShader: vertexShader(),
  fragmentShader: fragmentShader()

} );


// //Instantiate a loader for the .gltf file
 const loader = new GLTFLoader(loadingManager);
 loader.load(
   `models/text/Headline.gltf`,
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

 const loader2 = new GLTFLoader(loadingManager);
 loader2.load(
  `models/text/Underline.gltf`,
  function (gltf2) {
    //If the file is loaded, add it to the scene
    object2 = gltf2.scene;
    object2.traverse((o2) => {
      if (o2.isMesh) o2.material = newMaterial2;
    });
    scene.add(object2);
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
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

//Add the renderer to the DOM
document.getElementById("container3D").appendChild(renderer.domElement);

//Set how far the camera will be from the 3D model
function SetCameraPosition(){
  if (window.innerWidth > 1300){
    camera.position.z = 200;
  }
  if (window.innerWidth <= 1300 && window.innerWidth > 1000){
    camera.position.z = 250;
  }
  if (window.innerWidth <= 1000 && window.innerWidth > 700){
    camera.position.z = 300;
  }
  if (window.innerWidth <= 700 && window.innerWidth > 500){
    camera.position.z = 400;
  }
  if (window.innerWidth <= 500){
    camera.position.z = 500;
  }
}


//Add a listener to the window, so we can resize the window and the camera
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  
  SetCameraPosition()
});

//add mouse position listener, so we can make the eye move
document.onmousemove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
};

let timer = 0.0;

//Render the scene
function animate() {
  requestAnimationFrame(animate);
  if (object && object2){
    object.rotation.y = -1.85 + mouseX/2 / window.innerWidth;
    object.rotation.x = -0.3 + mouseY/2 / window.innerHeight;
    object2.rotation.y = -1.85 + mouseX/2 / window.innerWidth;
    object2.rotation.x = -0.3 + mouseY/2 / window.innerHeight;
  }
  
  timer = timer + 0.00005;
  if (timer >= 0.49){
    timer = 0.0;
  }
  newMaterial.uniforms.time.value = timer;
  newMaterial2.uniforms.time.value = timer;
  renderer.render(scene, camera); 
}



//Start the 3D rendering
SetCameraPosition();
animate();

function onTransitionEnd( event ) {

	event.target.remove();
	
}

