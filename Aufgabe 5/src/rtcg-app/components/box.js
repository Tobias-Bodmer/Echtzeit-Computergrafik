import { BoxBufferGeometry, Mesh, MeshStandardMaterial } from 'https://unpkg.com/three@0.127.0/build/three.module.js';

function createCube() {

    // ERstellung der Geometrie
    const geometry = new BoxBufferGeometry(2, 2, 2);

    // ERstellung des Standard Basismaterials
    const material = new MeshStandardMaterial();

    material.roughness = 0.25;

    // Erzeugung eines Meshesm dass Geometrie und Material beinhaltet
    const cube = new Mesh(geometry, material);

    return cube;
}

export { createCube };