import { MeshPhongMaterial, TextureLoader } from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r126/three.module.js';
import { createPlane } from './geometry.js';

function createGameBoard(_width, _height, _color, _texture, _normal, _generateStones) {
    var simplex = new SimplexNoise();

    var gameBoard = [];

    const plane = createPlane(_width, _height, 254, _color, 0.25)
    plane.rotation.x = -Math.PI / 2;
    plane.position.z = -_height / 2 + 0.5;

    // const textureMap = new TextureLoader().load(texture);
    // const normalMap = new TextureLoader().load(normal);
    const textureMap = textureGenerator(simplex, plane);

    let material = new MeshPhongMaterial();
    material.map = textureMap;
    // material.normalMap = normalMap;

    plane.material = material;

    if (_generateStones) {
        gameBoard.push(stonesGenerator(1, plane));
        gameBoard.push(stonesGenerator(2, plane));
    }

    gameBoard.push(plane);

    return gameBoard;
}

function stonesGenerator(_i, _plane) {
    var particleCount = 25;
    var particles = new THREE.BufferGeometry;

    var posArray = new Float32Array(particleCount * 3);

    const positionAttribute = _plane.geometry.getAttribute('position');

    for (let i = 0; i < particleCount * 3; i = i + 3) {
        posArray[i] = Math.random() * 20 - 10;
        posArray[i + 1] = positionAttribute.getZ(positionAttribute.array.indexOf(positionAttribute.array.find(element => element >= posArray[i] - 0.05 && element <= posArray[i] + 0.05))) + 0.3;
        posArray[i + 2] = Math.random() * 20 - 20;
    }
    particles.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    let sprite = new THREE.TextureLoader().load('./src/img/stone' + _i + '.png');
    var pMaterial = new THREE.PointsMaterial({ size: 0.04, sizeAttenuation: true, map: sprite, alphaTest: 0.5, transparent: true });
    const particlesMesh = new THREE.Points(particles, pMaterial);

    return particlesMesh;
}

function textureGenerator(_simplex, _plane) {
    const zPos = [];

    const width = 255;
    const height = 255;
    const size = width * height;
    const data = new Uint8Array(3 * size);

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            var g = Math.abs(_simplex.noise2D(x / 64, y / 64) * 0.5 + 0.6);

            if (g <= 0.45) {
                data[(x + y * width) * 3 + 0] = Math.min(Math.max(g * 57, 57 / 1.5), 57);
                data[(x + y * width) * 3 + 1] = Math.min(Math.max(g * 120, 120 / 1.5), 120);
                data[(x + y * width) * 3 + 2] = Math.min(Math.max(g * 41, 41 / 1.5), 41);
            } else {
                data[(x + y * width) * 3 + 0] = Math.min(Math.max(g * 206, 206 / 1.8), 206);
                data[(x + y * width) * 3 + 1] = Math.min(Math.max(g * 138, 138 / 1.8), 138);
                data[(x + y * width) * 3 + 2] = Math.min(Math.max(g * 86, 86 / 1.8), 86);
            }

            zPos.push(g);
        }
    }
    worldGenerator(_plane, zPos);



    const texture = new THREE.DataTexture(data, width, height, THREE.RGBFormat);

    return texture;
}

function worldGenerator(_plane, _zPos) {
    const positionAttribute = _plane.geometry.getAttribute('position');

    for (let vertexIndex = 0; vertexIndex < positionAttribute.count; vertexIndex++) {
        positionAttribute.setZ(vertexIndex, _zPos[vertexIndex]/1.25);
    }
}

export { createGameBoard };