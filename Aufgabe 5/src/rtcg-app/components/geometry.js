import { CylinderGeometry, SphereBufferGeometry, BoxBufferGeometry, PlaneBufferGeometry, Mesh, MeshStandardMaterial, Color } from 'https://unpkg.com/three@0.127.0/build/three.module.js';

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

function createCube(width, height, depth, color, roughness) {

    // ERstellung der Geometrie
    const geometry = new BoxBufferGeometry(width, height, depth);

    // ERstellung des Standard Basismaterials
    const material = new MeshStandardMaterial();

    material.color = new Color(color);

    material.roughness = roughness;

    // Erzeugung eines Meshesm dass Geometrie und Material beinhaltet
    const cube = new Mesh(geometry, material);

    return cube;
}

function createSphere(radius, widthSegments, heightSegments, color, roughness) {

    // ERstellung der Geometrie
    const geometry = new SphereBufferGeometry(radius, widthSegments, heightSegments);

    // ERstellung des Standard Basismaterials
    const material = new MeshStandardMaterial();

    material.color = new Color(color);

    material.roughness = roughness;

    // Erzeugung eines Meshesm dass Geometrie und Material beinhaltet
    const sphere = new Mesh(geometry, material);

    return sphere;
}

function createCylinder(radiusTop, radiusBottom, height, radialSegments, heightSegments, color, roughness) {

    // ERstellung der Geometrie
    const geometry = new CylinderGeometry(radiusTop, radiusBottom, height, radialSegments, heightSegments);

    // ERstellung des Standard Basismaterials
    const material = new MeshStandardMaterial();

    material.color = new Color(color);

    material.roughness = roughness;

    // Erzeugung eines Meshesm dass Geometrie und Material beinhaltet
    const cylinder = new Mesh(geometry, material);

    return cylinder;
}

export { createPlane, createCube, createSphere, createCylinder };