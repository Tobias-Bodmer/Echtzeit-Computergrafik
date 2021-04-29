import { SphereBufferGeometry, Mesh, MeshBasicMaterial } from 'https://unpkg.com/three@0.127.0/build/three.module.js';

function createSphere() {

    // ERstellung der Geometrie
    const geometry = new SphereBufferGeometry(2, 32, 32);

    // ERstellung des Standard Basismaterials
    const material = new MeshBasicMaterial({ color: 'green' });

    // Erzeugung eines Meshesm dass Geometrie und Material beinhaltet
    const sphere = new Mesh(geometry, material);

    return sphere;
}

export { createSphere };