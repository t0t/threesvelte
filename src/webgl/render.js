import {
    WebGLRenderer,
    Scene,
    PerspectiveCamera,
    AmbientLight,
    PointLight,
    Raycaster,
    Vector2,
    Vector3,
    MeshStandardMaterial
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import * as mesh from './markers';
import { activeLocationName } from '../store';

let renderer, scene, camera;
let markerMeshes = []; // meshes
let ambientLight, pointLight; // lights
let orbitControls; // controls

let markerNames = ['Button1', 'Button2', 'Button3'];
let markerCoordinates = [
    [30, 10], 
    [10, 11], 
    [20, 20]
];

// Model loader
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath("/draco/")
const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

export async function initialize() {
    renderer = new WebGLRenderer( {antialias: true} );
    scene = new Scene();
    camera = new PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);

    ambientLight = new AmbientLight(0xffffff, 1);
    pointLight = new PointLight(0xffffff, 1);
}

const material = new MeshStandardMaterial( { color: "#666666"} );
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
        scene.add( gltf.scene ) 
    })

    scene.add(camera);
    scene.add(ambientLight);
    scene.add(pointLight);

    camera.position.set(0, 10, 20);
    pointLight.position.set(0, 1.85, 5);

    orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.enableDamping = true;
    orbitControls.enableZoom = true;
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