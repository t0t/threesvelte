import { TextureLoader } from 'three';

const textureLoader = new TextureLoader();

export function loadTexture(path) {
    return new Promise((resolve, reject) => textureLoader.load(path, resolve, null, reject));
}