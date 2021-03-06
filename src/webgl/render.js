import {
    WebGLRenderer,
    Scene,
    PerspectiveCamera,
    HemisphereLight,
    Raycaster,
    Vector2,
    Vector3,
    MeshLambertMaterial,
    DoubleSide,
    Color
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import * as mesh from './markers';
import { activeLocationName } from '../store';

let renderer, scene, camera;
let markerMeshes = []; // meshes
let luz; // lights
let orbitControls; // controls

let markerNames = ['Button1', 'Button2', 'Button3'];
let markerCoordinates = [
    [1, 0.1], 
    [-3, -0.2], 
    [3, 0.3]
];

// Model loader
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath("/draco/")
const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

export async function initialize() {
    renderer = new WebGLRenderer( {
        antialias: true,
        alpha: true
    } );
    scene = new Scene();
    camera = new PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
    luz = new HemisphereLight(0x404040, "black", 7.5);
}

const material = new MeshLambertMaterial({
    // roughness: 0.01,
    side: DoubleSide
});
material.color = new Color("grey")
// material.wireframe = true

export async function display() {
    gltfLoader.load( '/models/draco.glb', ( gltf ) => { 
        gltf.scene.traverse( node => 
            { if (node.isMesh) { 
              node.material = material; 
            } }
        );
        for (let i = 0; i < markerCoordinates.length; i++) {
            const markerMesh = mesh.createMarkerMesh(markerCoordinates[i][0], markerCoordinates[i][1], markerNames[i]);
            markerMeshes.push(markerMesh);
            gltf.scene.add(markerMesh);
        }
        gltf.scene.rotateY(55);
        scene.add( gltf.scene ) 
    })

    scene.add(camera);
    scene.add(luz);
    
    camera.position.set(0, 4, 18);
    luz.position.set(-1, 3, 10)

    orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.enableDamping = false;
    orbitControls.enableZoom = false;
    orbitControls.enablePan = true;
    orbitControls.rotateSpeed = 0.5;
    orbitControls.autoRotate = true;
    orbitControls.autoRotateSpeed = -0.3;
    orbitControls.target = new Vector3(1, 1.5, 0);
    orbitControls.maxPolarAngle = 6.5;
    orbitControls.minPolarAngle = 0.5;
    orbitControls.update();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
    document.getElementById('webgl-container').appendChild(renderer.domElement);

    return true;
}

export async function animate() {
    
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