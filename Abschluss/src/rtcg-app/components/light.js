import { AmbientLight, SpotLight } from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r126/three.module.js';

function createSpotLight() {

    const keyLight = new SpotLight('white', 5);
    const ambientLight = new AmbientLight('white', 2);

    keyLight.position.set(0, 10,  -21);

    keyLight.castShadow = true;

    keyLight.shadow.mapSize.x = 4096;
    keyLight.shadow.mapSize.y = 4096;

    return { keyLight, ambientLight };
}

export { createSpotLight };