import { PerspectiveCamera, Vector3 } from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r126/three.module.js';

function createCamera() {

    const camera = new PerspectiveCamera(
        35, // FOV
        1, // Aspect Ratio
        0.1, // Near Clip
        1000, // Far Clip
    );

    // Rückstellung der Kamera
    camera.position.set(0, 35, 40);

    camera.lookAt(new Vector3(0, 0, 0));

    return camera;
}

export { createCamera };