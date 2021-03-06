import {
    OctahedronGeometry,
    MeshNormalMaterial,
    Mesh,
    Vector3
} from 'three';

export function createMarkerMesh(latitude, longitude, name) {
    const xCoord = latitude * (Math.PI / longitude);
    const yCoord = latitude * (Math.PI / 180);
    const zCoord = -latitude * (Math.PI / 180) * longitude;

    const geometry = new OctahedronGeometry(.5);
    const material = new MeshNormalMaterial();
    const mesh = new Mesh(geometry, material);

    mesh.name = name;
    mesh.position.set(xCoord, yCoord, zCoord);
    mesh.lookAt( new Vector3(0, 0, 0) );
    return mesh;
}