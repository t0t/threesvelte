import {
    WebGLRenderer,
    Scene,
    PerspectiveCamera,
    AmbientLight,
    PointLight,
    Raycaster,
    Vector2,
    Vector3
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import * as util from './util';
import * as mesh from './mesh';
import { activeLocationName } from '../store';

let renderer, scene, camera;
let earthMesh, cloudMesh, markerMeshes = []; // meshes
let earthMap, earthBump, earthSpec, cloudMap; // textures
let ambientLight, pointLight; // lights
let orbitControls; // controls

// Ottawa, Toronto, Winnipeg, Frimley
let markerNames = ['Ottawa', 'Toronto', 'Chertsey'];
let markerCoordinates = [[45.424721, -75.695000], [43.6532, -79.3832], [51.3865, -0.5095]];

export async function loadTextures() {
    let promises = [
        util.loadTexture('/assets/webgl/8k_earth_nightmap.jpg'),
        util.loadTexture('/assets/webgl/8081_earthbump10k.jpg'),
        util.loadTexture('/assets/webgl/8081_earthspec10k.jpg'),
        util.loadTexture('/assets/webgl/8k_earth_clouds.jpg')
    ];
    const values = await Promise.all(promises);
    earthMap = values[0];
    earthBump = values[1];
    earthSpec = values[2]; 
    cloudMap = values[3];
}

// Model loader
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath("/draco/")

const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

gltfLoader.load( 
  '/models/draco.glb', 
  ( gltf ) => {
    gltf.scene.traverse( node => 
      { if (node.isMesh) { 
        // node.material = material; 
        node.position.x = 0; 
        camera.lookAt(node.position)
      } }
    );
	scene.add( gltf.scene )
  console.log(gltf.scene)
})

export async function initialize() {
    renderer = new WebGLRenderer({antialias: true});
    scene = new Scene();
    camera = new PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 1000);

    ambientLight = new AmbientLight(0xffffff, 1);
    pointLight = new PointLight(0xffffff, 1.5);
}

export async function display() {
    earthMesh = mesh.createEarthMesh();
    cloudMesh = mesh.createCloudMesh();

    scene.add(camera);
    scene.add(ambientLight);
    scene.add(pointLight);
    scene.add(earthMesh);
    earthMesh.add(cloudMesh);

    earthMap.anisotropy = renderer.capabilities.getMaxAnisotropy();

    camera.position.set(0, 1.9, 4.3);
    pointLight.position.set(0, 1.85, 5);
    earthMesh.rotation.x -= 0.15;
    // earthMesh.rotation.y += 0.15;

    for (let i = 0; i < markerCoordinates.length; i++) {
        const markerMesh = mesh.createMarkerMesh(markerCoordinates[i][0], markerCoordinates[i][1], markerNames[i]);
        markerMeshes.push(markerMesh);
        earthMesh.add(markerMesh);
    }

    orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.enableDamping = true;
    orbitControls.enableZoom = false;
    orbitControls.enablePan = false;
    orbitControls.rotateSpeed = 0.5;
    orbitControls.autoRotate = true;
    orbitControls.autoRotateSpeed = -0.3;
    orbitControls.target = new Vector3(0, 1.9, 0);
    orbitControls.maxPolarAngle = 3;
    orbitControls.minPolarAngle = 1;
    orbitControls.update();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
    document.getElementById('webgl-container').appendChild(renderer.domElement);

    return true;
}

export async function animate() {
    cloudMesh.rotation.y -= 0.000125;
    
    for (let mesh of markerMeshes) {
        mesh.rotation.z -= 0.025;
    }
    
    orbitControls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function click(event) {
    if (event.type == 'touchend')
        event = event.touches[0] || event.changedTouches[0];
    const raycaster = new Raycaster();
    const mouse = new Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(markerMeshes, true);
    if (intersects.length > 0)
        activeLocationName.set(intersects[0].object.name);
}

window.addEventListener('resize', resize);
window.addEventListener('click', click);
window.addEventListener('touchend', click);