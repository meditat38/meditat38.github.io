//import * as THREE from './node_modules/three/build';
//import { GLTFLoader } from './node_modules/three/addons/loaders/GLTFLoader.js';
//import { NodeToyMaterial } from './node_modules/@nodetoy/three-nodetoy';

//import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
//import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
//import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
//import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

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
let controls;

//Set which object to render
let objToRender = 'text';

function vertexShader() {
  return `
  // Created with NodeToy | Three.js r149

  // <node_builder>
  
  // uniforms
  uniform mat3 _normalMatrix; uniform mat4 _viewMatrix; uniform sampler2D nodeUniform3; uniform float _time; uniform sampler2D nodeUniform4; uniform sampler2D nodeUniform5; uniform sampler2D nodeUniform6; 
  // attributes
  attribute vec3 color; 
  // varys
  varying vec3 nodeVary0; varying vec3 nodeVary1; varying vec2 nodeVary2; 
  // vars
  vec3 nodeVar0; vec4 nodeVar1; vec4 nodeVar2; vec3 nodeVar3; vec3 nodeVar4; float nodeVar5; float nodeVar6; float nodeVar7; vec2 nodeVar8; vec2 nodeVar9; vec4 nodeVar10; float nodeVar11; float nodeVar12; vec2 nodeVar13; vec2 nodeVar14; vec4 nodeVar15; float nodeVar16; float nodeVar17; float nodeVar18; vec2 nodeVar19; vec2 nodeVar20; vec4 nodeVar21; float nodeVar22; float nodeVar23; float nodeVar24; float nodeVar25; vec2 nodeVar26; vec2 nodeVar27; vec4 nodeVar28; float nodeVar29; float nodeVar30; float nodeVar31; vec3 nodeVar32; 
  // codes
  float remap_GgDkEdfCs1Vc ( float value, float minOld, float maxOld, float minNew, float maxNew ) {
      float x = ( value - minOld ) / ( maxOld - minOld );
      return minNew + ( maxNew - minNew ) * x;
    }
  float customFn_0kfimt6pIa2w ( float value, float minOld, float maxOld, float minNew, float maxNew ) {
                  
      return remap_GgDkEdfCs1Vc( value, minOld, maxOld, minNew, maxNew );
              
              }
  float remap_0pkUGErP4F3k ( float value, float minOld, float maxOld, float minNew, float maxNew ) {
      float x = ( value - minOld ) / ( maxOld - minOld );
      return minNew + ( maxNew - minNew ) * x;
    }
  float customFn_iVfd35YdlnBy ( float value, float minOld, float maxOld, float minNew, float maxNew ) {
                  
      return remap_0pkUGErP4F3k( value, minOld, maxOld, minNew, maxNew );
              
              }
  
  // variables
  // </node_builder>
  
  
  
  
  
  
  
  #include <common>
  #include <uv_pars_vertex>
  #include <uv2_pars_vertex>
  #include <envmap_pars_vertex>
  #include <color_pars_vertex>
  #include <fog_pars_vertex>
  #include <morphtarget_pars_vertex>
  #include <skinning_pars_vertex>
  #include <logdepthbuf_pars_vertex>
  #include <clipping_planes_pars_vertex>
  
  void main() {
  nodeVary1 = normal;
    nodeVar0 = ( _normalMatrix * nodeVary1 );
    nodeVar1 = ( vec4( nodeVar0, 0.0 ) );
    nodeVar2 = ( nodeVar1 * _viewMatrix );
    nodeVar3 = normalize( nodeVar2.xyz );
    nodeVar4 = nodeVar3;
    nodeVary0 = nodeVar4;
    nodeVary2 = uv;
    
  
  
    #include <uv_vertex>
    #include <uv2_vertex>
    #include <color_vertex>
    #include <morphcolor_vertex>
  
    #if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
  
      #include <beginnormal_vertex>
      #include <morphnormal_vertex>
      #include <skinbase_vertex>
      #include <skinnormal_vertex>
      #include <defaultnormal_vertex>
  
    #endif
  
    #include <begin_vertex>
  nodeVar5 = customFn_0kfimt6pIa2w( color.x, 0.0, 1.0, 0.5, 1.0 );
    nodeVar6 = ( _time * 0.075 );
    nodeVar7 = nodeVar6;
    nodeVar8 = vec2(nodeVar7,0.0);
    nodeVar9 = (uv * vec2( 0, 0.7 ) + nodeVar8);
    nodeVar10 = ( texture2D( nodeUniform3, nodeVar9 ) );
    nodeVar11 = step( nodeVar10.x, 0.4 );
    nodeVar12 = ( nodeVar7 + 35.0 );
    nodeVar13 = vec2(nodeVar12,4.25);
    nodeVar14 = (uv * vec2( 0, 0.9 ) + nodeVar13);
    nodeVar15 = ( texture2D( nodeUniform4, nodeVar14 ) );
    nodeVar16 = step( nodeVar15.x, 0.4 );
    nodeVar17 = ( nodeVar11 + nodeVar16 );
    nodeVar18 = ( nodeVar7 + 12.0 );
    nodeVar19 = vec2(nodeVar18,1.57);
    nodeVar20 = (uv * vec2( 0, 0.8 ) + nodeVar19);
    nodeVar21 = ( texture2D( nodeUniform5, nodeVar20 ) );
    nodeVar22 = step( nodeVar21.x, 0.4 );
    nodeVar23 = ( nodeVar17 + nodeVar22 );
    nodeVar24 = ( nodeVar23 / 3.0 );
    nodeVar25 = ( nodeVar7 * 0.5 );
    nodeVar26 = vec2(0.0,nodeVar25);
    nodeVar27 = (uv * vec2( 0.05, 0 ) + nodeVar26);
    nodeVar28 = ( texture2D( nodeUniform6, nodeVar27 ) );
    nodeVar29 = customFn_iVfd35YdlnBy( nodeVar28.x, 0.0, 1.0, -25.0, 7.5 );
    nodeVar30 = ( nodeVar24 * nodeVar29 );
    nodeVar31 = ( nodeVar5 * nodeVar30 );
    nodeVar32 = ( normal * vec3( nodeVar31 ) );
    
    transformed = position + nodeVar32;
  
    #include <morphtarget_vertex>
    #include <skinning_vertex>
    #include <project_vertex>
    #include <logdepthbuf_vertex>
    #include <clipping_planes_vertex>
  
    #include <worldpos_vertex>
    #include <envmap_vertex>
    #include <fog_vertex>
  
  }  
  `
}
function fragmentShader() {
  return `
  // Created with NodeToy | Three.js r149

  // <node_builder>
  
  // uniforms
  uniform mat4 _worldToObjMatrix; uniform vec3 _viewDir; uniform sampler2D nodeUniform0; uniform float _time; uniform sampler2D nodeUniform1; uniform sampler2D nodeUniform2; 
  // attributes
  
  // varys
  varying vec3 nodeVary0; varying vec3 nodeVary1; varying vec2 nodeVary2; 
  // vars
  vec3 nodeVar0; vec3 nodeVar1; float nodeVar2; float nodeVar3; float nodeVar4; float nodeVar5; vec2 nodeVar6; vec2 nodeVar7; vec4 nodeVar8; float nodeVar9; float nodeVar10; vec2 nodeVar11; vec2 nodeVar12; vec4 nodeVar13; float nodeVar14; float nodeVar15; vec2 nodeVar16; vec2 nodeVar17; vec4 nodeVar18; float nodeVar19; vec4 nodeVar20; vec4 nodeVar21; vec4 nodeVar22; vec4 nodeVar23; vec3 nodeVar24; 
  // codes
  float customFn_u6bFLSncD7UL (  ) {
                  
      
      float NdotV = dot(nodeVar0, normalize(nodeVar1));
      float fresnelNode = ( 0.0 + 1.0 * pow( 1.0 - NdotV, 1.0) );
      return fresnelNode;
      
              }
  
  // variables
  // </node_builder>
  
  
  
  
  
  
  
  
  #ifndef FLAT_SHADED
  
    varying vec3 vNormal;
  
  #endif
  
  #include <common>
  #include <dithering_pars_fragment>
  #include <color_pars_fragment>
  #include <uv_pars_fragment>
  #include <uv2_pars_fragment>
  #include <map_pars_fragment>
  #include <alphamap_pars_fragment>
  #include <alphatest_pars_fragment>
  #include <aomap_pars_fragment>
  #include <lightmap_pars_fragment>
  #include <envmap_common_pars_fragment>
  #include <envmap_pars_fragment>
  #include <fog_pars_fragment>
  #include <specularmap_pars_fragment>
  #include <logdepthbuf_pars_fragment>
  #include <clipping_planes_pars_fragment>
  
  void main() {
  
  
  
    #include <clipping_planes_fragment>
  
    vec4 diffuseColor = vec4( 0.0 );
  
    #include <logdepthbuf_fragment>
    #include <map_fragment>
    #include <color_fragment>
  nodeVar0 = (normalize(nodeVary0));
    nodeVar1 = _viewDir;
    nodeVar2 = customFn_u6bFLSncD7UL(  );
    nodeVar3 = smoothstep( 0.5, 0.4, nodeVar2 );
    nodeVar4 = ( _time * 0.075 );
    nodeVar5 = nodeVar4;
    nodeVar6 = vec2(nodeVar5,0.0);
    nodeVar7 = (nodeVary2 * vec2( 0, 0.7 ) + nodeVar6);
    nodeVar8 = ( texture2D( nodeUniform0, nodeVar7 ) );
    nodeVar9 = step( nodeVar8.x, 0.4 );
    nodeVar10 = ( nodeVar5 + 35.0 );
    nodeVar11 = vec2(nodeVar10,4.25);
    nodeVar12 = (nodeVary2 * vec2( 0, 0.9 ) + nodeVar11);
    nodeVar13 = ( texture2D( nodeUniform1, nodeVar12 ) );
    nodeVar14 = step( nodeVar13.x, 0.4 );
    nodeVar15 = ( nodeVar5 + 12.0 );
    nodeVar16 = vec2(nodeVar15,1.57);
    nodeVar17 = (nodeVary2 * vec2( 0, 0.8 ) + nodeVar16);
    nodeVar18 = ( texture2D( nodeUniform2, nodeVar17 ) );
    nodeVar19 = step( nodeVar18.x, 0.4 );
    nodeVar20 = vec4(nodeVar9,nodeVar14,nodeVar19,0.0);
    nodeVar21 = step( nodeVar20, vec4( vec3( 0.1 ), 1.0 ) );
    nodeVar22 = ( vec4( vec3( nodeVar3 ), 1.0 ) * nodeVar21 );
    nodeVar23 = clamp( nodeVar22, vec4( vec3( 0.0 ), 1.0 ), vec4( vec3( 1.0 ), 1.0 ) );
    nodeVar24 = ( nodeVar23.xyz * vec3( 1, 1, 1 ) );
    
    diffuseColor = vec4( nodeVar24, 1.0 );
  
    #include <alphamap_fragment>
    #include <alphatest_fragment>
    #include <specularmap_fragment>
  
    ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
  
    // accumulation (baked indirect lighting only)
    #ifdef USE_LIGHTMAP
  
      vec4 lightMapTexel = texture2D( lightMap, vUv2 );
      reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
  
    #else
  
      reflectedLight.indirectDiffuse += vec3( 1.0 );
  
    #endif
  
    // modulation
    
  
    reflectedLight.indirectDiffuse *= diffuseColor.rgb;
  
    vec3 outgoingLight = reflectedLight.indirectDiffuse;
  
    #include <envmap_fragment>
  
    #include <output_fragment>
    #include <tonemapping_fragment>
    #include <encodings_fragment>
    #include <fog_fragment>
    #include <premultiplied_alpha_fragment>
    #include <dithering_fragment>
  
  }  
  `
}
let uniforms;

uniforms.nodeUniform0 = {type: 'texture', value: "./images/noise.png"}
uniforms.nodeUniform1 = {type: 'texture', value: "./images/noise.png"}
uniforms.nodeUniform2 = {type: 'texture', value: "./images/noise.png"}
uniforms.nodeUniform3 = {type: 'texture', value: "./images/noise.png"}
uniforms.nodeUniform4 = {type: 'texture', value: "./images/noise.png"}
uniforms.nodeUniform5 = {type: 'texture', value: "./images/noise.png"}
uniforms.nodeUniform6 = {type: 'texture', value: "./images/noise.png"}
let newMaterial =  new THREE.ShaderMaterial({
  uniforms: uniforms,
  fragmentShader: fragmentShader(),
  vertexShader: vertexShader(),
})
//Add Node Toy material
//let newMaterial = new NodeToyMaterial({
//  url: "https://draft.nodetoy.co/gVik39zC4oHZnols"
//});

//Instantiate a loader for the .gltf file
const loader = new GLTFLoader();

//Load the file
loader.load(
  `models/${objToRender}/scene2.gltf`,
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
  //NodeToyMaterial.tick();
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