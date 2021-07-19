import { createSpotLight } from './light.js';
import { ConeGeometry, CylinderGeometry, SphereBufferGeometry, BoxBufferGeometry, PlaneBufferGeometry, Mesh, MeshStandardMaterial, Color, MathUtils, Scene } from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r126/three.module.js';

function createPlane(_width, _height, _segments, _color, _roughness) {
    const geometry = new PlaneBufferGeometry(_width, _height, _segments, _segments);

    const material = new MeshStandardMaterial();

    material.color = new Color(_color);
    material.roughness = _roughness;

    const plane = new Mesh(geometry, material);


    return plane;
}

function createCube(_size, _color, _roughness) {
    const geometry = new BoxBufferGeometry(_size, _size, _size);

    const material = new MeshStandardMaterial();

    material.color = new Color(_color);
    material.roughness = _roughness;

    const cube = new Mesh(geometry, material);

    return cube;
}

function createCuboid(_width, _height, _depth, _color, _roughness) {
    const geometry = new BoxBufferGeometry(_width, _height, _depth);

    const material = new MeshStandardMaterial();

    material.color = new Color(_color);
    material.roughness = _roughness;

    const cuboid = new Mesh(geometry, material);


    return cuboid;
}

function createSphere(_radius, _widthSegments, _heightSegments, _color, _roughness) {
    const geometry = new SphereBufferGeometry(_radius, _widthSegments, _heightSegments);

    const material = new MeshStandardMaterial();

    material.color = new Color(_color);
    material.roughness = _roughness;

    const sphere = new Mesh(geometry, material);


    return sphere;
}

function createCylinder(_radiusTop, _radiusBottom, _height, _radialSegments, _heightSegments, _color, _roughness) {
    const geometry = new CylinderGeometry(_radiusTop, _radiusBottom, _height, _radialSegments, _heightSegments);

    const material = new MeshStandardMaterial();

    material.color = new Color(_color);
    material.roughness = _roughness;

    const cylinder = new Mesh(geometry, material);


    return cylinder;
}

function createCone(_radius, _height, _radialSegments, _heightSegments, _color, _roughness) {
    const geometry = new ConeGeometry(_radius, _height, _height, _radialSegments, _heightSegments);

    const material = new MeshStandardMaterial();

    material.color = new Color(_color);
    material.roughness = _roughness;

    const cone = new Mesh(geometry, material);


    return cone;
}

function createTestScene(_cubes, _spheres, _spaceing) {
    const scene = new Scene();

    let plane = createPlane(20, 20, 64, "white", 0);
    plane.position.y = -2;
    plane.rotation.x = -Math.PI / 2;
    scene.add(plane);

    for (let i = 0; i < _cubes; i++) {
        let cube = createCube(1, "white", 0.25);
        cube.position.set((-5 + _spaceing * i), -1, (-1 * _spaceing));
        scene.add(cube);
    }

    for (let i = 0; i < _spheres; i++) {
        let sphere = createSphere(0.5, 16, 16, "white", 0.25);
        sphere.position.set((-5 + _spaceing * i), -1, (1 * _spaceing));
        scene.add(sphere);
    }

    const light = createSpotLight();
    scene.add(light.keyLight);
    scene.add(light.ambientLight);


    return scene;
}

export { createPlane, createCube, createSphere, createCylinder, createCuboid, createCone, createTestScene };