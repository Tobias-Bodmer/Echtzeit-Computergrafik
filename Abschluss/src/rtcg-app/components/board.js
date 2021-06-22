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

    return gameBoard;
}



export { createGameBoard };