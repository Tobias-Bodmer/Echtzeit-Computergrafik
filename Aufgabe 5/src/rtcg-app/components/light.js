import { AmbientLight, SpotLight } from 'https://unpkg.com/three@0.127.0/build/three.module.js';

function createSpotLight() {

    const keyLight = new SpotLight('white', 14);
    const ambientLight = new AmbientLight('blue', 0.5);

    keyLight.position.set(0, 10, 6);

    keyLight.castShadow = true;

    keyLight.shadow.mapSize.x = 4096;
    keyLight.shadow.mapSize.y = 4096;

    return { keyLight, ambientLight };
}

export { createSpotLight };