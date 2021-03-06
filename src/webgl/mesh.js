import {
    SphereGeometry,
    OctahedronGeometry,
    MeshPhongMaterial,
    MeshNormalMaterial,
    Mesh,
    Vector3
} from 'three';

export function createEarthMesh(map, bump, spec) {
    const geometry = new SphereGeometry(2, 64, 64);
    const material = new MeshPhongMaterial({
        map: map,
        bumpMap: bump,
        bumpScale: 0.3,
        specularMap: spec,
        specular: 0.05
    });
    return new Mesh(geometry, material);
}

export function createCloudMesh(map) {
    const geometry = new SphereGeometry(2.01, 64, 64);
    const material = new MeshPhongMaterial({
        map: map,
        bumpMap: map,
        bumpScale: 2,
        opacity: 0.15,
        transparent: true
    });
    return new Mesh(geometry, material);
}

export function createMarkerMesh(latitude, longitude, name) {
    const radius = 2.06;
    const xCoord = radius * Math.cos(latitude * (Math.PI / 180)) * Math.cos(longitude * (Math.PI / 180));
    const yCoord = radius * Math.sin(latitude * (Math.PI / 180));
    const zCoord = -radius * Math.cos(latitude * (Math.PI / 180)) * Math.sin(longitude * (Math.PI / 180));

    const geometry = new OctahedronGeometry(.03);
    const material = new MeshNormalMaterial();
    const mesh = new Mesh(geometry, material);

    mesh.name = name;
    mesh.position.set(xCoord, yCoord, zCoord);
    mesh.lookAt(new Vector3(0, 0, 0));
    return mesh;
}