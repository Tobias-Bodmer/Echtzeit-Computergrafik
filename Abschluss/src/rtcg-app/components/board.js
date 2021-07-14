import { MeshPhongMaterial, TextureLoader } from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r126/three.module.js';
import { createPlane, createCube } from './geometry.js';

function createGameBoard(width, height, color, texture, normal, generateStones) {

    var gameBoard = [];

    const plane = createPlane(width, height, 64, color, 0.25);
    plane.rotation.x = -Math.PI / 2;
    plane.position.z = -height / 2 + 0.5;

    // console.log(textureGenerator());

    // const textureMap = new TextureLoader().load(texture);
    const textureMap = textureGenerator();
    // const normalMap = new TextureLoader().load(normal);

    let material = new MeshPhongMaterial();
    material.map = textureMap;
    // material.normalMap = normalMap;

    plane.material = material;

    if (generateStones) {
        gameBoard.push(stonesGenerator(1));
        gameBoard.push(stonesGenerator(2));
    }

    gameBoard.push(plane);

    return gameBoard;
}

function stonesGenerator(i) {
    // create the particle variables
    var particleCount = 25;
    var particles = new THREE.BufferGeometry;

    var posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i = i + 3) {
        posArray[i] = Math.random() * 20 - 10;
        posArray[i + 1] = 0.2;
        posArray[i + 2] = Math.random() * 20 - 20;
    }
    particles.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    let sprite = new THREE.TextureLoader().load('./src/img/stone' + i + '.png');
    var pMaterial = new THREE.PointsMaterial({ size: 0.04, sizeAttenuation: true, map: sprite, alphaTest: 0.5, transparent: true });
    const particlesMesh = new THREE.Points(particles, pMaterial);

    return particlesMesh;
}

function textureGenerator() {
    const width = 256;
    const height = 256;
    const size = width * height;
    const data = new Uint8Array(3 * size);
    var simplex = new SimplexNoise();

    var noise = [];

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            var g = Math.abs(simplex.noise2D(x / 64, y / 64) * 0.5 + 0.6);

            data[(x + y * width) * 3 + 0] = Math.min(Math.max(g * 206, 206/1.8), 206);
            data[(x + y * width) * 3 + 1] = Math.min(Math.max(g * 138, 138/1.8), 138);
            data[(x + y * width) * 3 + 2] = Math.min(Math.max(g * 86, 86/1.8), 86);
        }
    }

    const texture = new THREE.DataTexture(data, width, height, THREE.RGBFormat);

    return texture;
}

export { createGameBoard };