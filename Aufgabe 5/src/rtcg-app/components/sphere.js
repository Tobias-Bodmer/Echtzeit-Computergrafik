import { SphereBufferGeometry, Mesh, MeshStandardMaterial } from 'https://unpkg.com/three@0.127.0/build/three.module.js';

function createSphere() {

    // ERstellung der Geometrie
    const geometry = new SphereBufferGeometry(2, 32, 32);

    // ERstellung des Standard Basismaterials
    const material = new MeshStandardMaterial({ color: 'green' });

    // Erzeugung eines Meshesm dass Geometrie und Material beinhaltet
    const sphere = new Mesh(geometry, material);

    return sphere;
}

export { createSphere };