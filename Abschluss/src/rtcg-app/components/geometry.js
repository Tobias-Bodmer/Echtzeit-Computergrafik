import { createSpotLight } from './light.js';
import { ConeGeometry, CylinderGeometry, SphereBufferGeometry, BoxBufferGeometry, PlaneBufferGeometry, Mesh, MeshStandardMaterial, Color, MathUtils, Scene } from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r126/three.module.js';

function createPlane(width, height, segments, color, roughness) {
    const geometry = new PlaneBufferGeometry(width, height, segments);

    const material = new MeshStandardMaterial();

    material.color = new Color(color);
    material.roughness = roughness;

    const plane = new Mesh(geometry, material);


    return plane;
}

function createCube(size, color, roughness) {
    const geometry = new BoxBufferGeometry(size, size, size);

    const material = new MeshStandardMaterial();

    material.color = new Color(color);
    material.roughness = roughness;

    const cube = new Mesh(geometry, material);

    const rad_perSecond = MathUtils.degToRad(25);

    cube.tick = (delta) => {
        cube.rotation.z += rad_perSecond * delta;
        cube.rotation.x += rad_perSecond * delta;
        cube.rotation.y += rad_perSecond * delta;
    };


    return cube;
}

function createCuboid(width, height, depth, color, roughness) {
    const geometry = new BoxBufferGeometry(width, height, depth);

    const material = new MeshStandardMaterial();

    material.color = new Color(color);
    material.roughness = roughness;

    const cuboid = new Mesh(geometry, material);


    return cuboid;
}

function createSphere(radius, widthSegments, heightSegments, color, roughness) {
    const geometry = new SphereBufferGeometry(radius, widthSegments, heightSegments);

    const material = new MeshStandardMaterial();

    material.color = new Color(color);
    material.roughness = roughness;

    const sphere = new Mesh(geometry, material);


    return sphere;
}

function createCylinder(radiusTop, radiusBottom, height, radialSegments, heightSegments, color, roughness) {
    const geometry = new CylinderGeometry(radiusTop, radiusBottom, height, radialSegments, heightSegments);

    const material = new MeshStandardMaterial();

    material.color = new Color(color);
    material.roughness = roughness;

    const cylinder = new Mesh(geometry, material);


    return cylinder;
}

function createCone(radius, height, radialSegments, heightSegments, color, roughness) {
    const geometry = new ConeGeometry(radius, height, height, radialSegments, heightSegments);

    const material = new MeshStandardMaterial();

    material.color = new Color(color);
    material.roughness = roughness;

    const cone = new Mesh(geometry, material);


    return cone;
}

function createTestScene(cubes, spheres, spaceing) {
    const scene = new Scene();

    let plane = createPlane(20, 20, 64, "white", 0);
    plane.position.y = -2;
    plane.rotation.x = -Math.PI / 2;
    scene.add(plane);

    for (let i = 0; i < cubes; i++) {
        let cube = createCube(1, "white", 0.25);
        cube.position.set((-5 + spaceing * i), -1, (-1 * spaceing));
        scene.add(cube);
    }

    for (let i = 0; i < spheres; i++) {
        let sphere = createSphere(0.5, 16, 16, "white", 0.25);
        sphere.position.set((-5 + spaceing * i), -1, (1 * spaceing));
        scene.add(sphere);
    }

    const light = createSpotLight();
    scene.add(light.keyLight);
    scene.add(light.ambientLight);


    return scene;
}

export { createPlane, createCube, createSphere, createCylinder, createCuboid, createCone, createTestScene };