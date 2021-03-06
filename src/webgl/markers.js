import {
    OctahedronGeometry,
    MeshNormalMaterial,
    Mesh,
    Vector3
} from 'three';

export function createMarkerMesh(latitude, longitude, name) {
    const xCoord = latitude;
    const yCoord = longitude;
    const zCoord = latitude * longitude;

    const geometry = new OctahedronGeometry(.5);
    const material = new MeshNormalMaterial();
    const mesh = new Mesh(geometry, material);

    mesh.name = name;
    mesh.position.set(xCoord, yCoord, zCoord);
    mesh.lookAt( new Vector3(0, 0, 0) );
    return mesh;
}