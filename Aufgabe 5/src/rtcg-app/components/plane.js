import { PlaneBufferGeometry, Mesh, MeshStandardMaterial, Color } from 'https://unpkg.com/three@0.127.0/build/three.module.js';

function createPlane(width, height, segments, color, roughness) {

    // ERstellung der Geometrie
    const geometry = new PlaneBufferGeometry(width, height, segments);

    // ERstellung des Standard Basismaterials
    const material = new MeshStandardMaterial();

    material.color = new Color(color);

    material.roughness = roughness;

    // Erzeugung eines Meshesm dass Geometrie und Material beinhaltet
    const plane = new Mesh(geometry, material);

    return plane;
}

export { createPlane };