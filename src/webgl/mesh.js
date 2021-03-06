import {
    OctahedronGeometry,
    MeshNormalMaterial,
    Mesh,
    Vector3
} from 'three';

export function createMarkerMesh(latitude, longitude, name) {
    const radius = 2.06;
    const xCoord = radius * Math.cos(latitude * (Math.PI / 180)) * Math.cos(longitude * (Math.PI / 180));
    const yCoord = radius * Math.sin(latitude * (Math.PI / 180));
    const zCoord = -radius * Math.cos(latitude * (Math.PI / 180)) * Math.sin(longitude * (Math.PI / 180));

    const geometry = new OctahedronGeometry(.3);
    const material = new MeshNormalMaterial();
    const mesh = new Mesh(geometry, material);

    mesh.name = name;
    mesh.position.set(xCoord, yCoord, zCoord);
    mesh.lookAt( new Vector3(0, 0, 0) );
    return mesh;
}