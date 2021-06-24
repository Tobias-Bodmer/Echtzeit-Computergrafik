import { MeshPhongMaterial, TextureLoader } from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r126/three.module.js';
import { createPlane, createCube } from './geometry.js';

function createGameBoard(width, height, color, texture, normal) {

    var gameBoard = [];

    const plane = createPlane(width, height, 64, color, 0.25);
    plane.rotation.x = -Math.PI / 2;
    plane.position.z = -height / 2 + 0.5;

    const textureMap = new TextureLoader().load(texture);
    const normalMap = new TextureLoader().load(normal);

    let material = new MeshPhongMaterial();
    material.map = textureMap;
    material.normalMap = normalMap;

    plane.material = material;

    gameBoard.push(generateStones());

    gameBoard.push(plane);

    return gameBoard;
}

function generateStones() {
    // create the particle variables
    var particleCount = 100;
    var particles = new THREE.BufferGeometry;

    var posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i = i + 3) {
        posArray[i] = Math.random()*20-10;
        posArray[i+1] = 0.1;
        posArray[i+2] = Math.random()*20-20;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    var pMaterial = new THREE.PointsMaterial({
        color: 0x555555,
        size: 0.02
    });

    const particlesMesh = new THREE.Points(particles, pMaterial);

    return particlesMesh;
}

export { createGameBoard };