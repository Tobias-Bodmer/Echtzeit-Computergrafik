import { MeshPhongMaterial, TextureLoader } from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r126/three.module.js';
import { createPlane, createCube } from './geometry.js';

function createGameBoard(width, height, color, texture, normal) {

    var gameBoard = [];

    const plane = createPlane(width, height, 64, color, 0.25);
    plane.rotation.x = -Math.PI / 2;
    plane.position.z = -height / 2 + 0.5;

    //TODO: LoadTexture
    const textureMap = new TextureLoader().load(texture);
    const normalMap = new TextureLoader().load(normal);

    let material = new MeshPhongMaterial();
    material.map = textureMap;
    material.normalMap = normalMap;

    plane.material = material;

    gameBoard.push(plane);

    for (let i = 0 - height / 2 + 0.5; i < height / 2; i++) {
        for (let j = 0; j < width; j++) {
            const cube = createCube(1, "white", 0.25);
            cube.position.z = -(height / 2) + i + 0.5;
            cube.position.x = -(width / 2) + j + 0.5;
            cube.material = new MeshPhongMaterial({ color, opacity: 0, transparent: true, });
            gameBoard.push(cube);
        }
    }

    return gameBoard;
}



export { createGameBoard };