import { PerspectiveCamera, Vector3 } from 'https://unpkg.com/three@0.127.0/build/three.module.js';

function createCamera() {

    const camera = new PerspectiveCamera(
        35, // FOV
        1, // Aspect Ratio
        0.1, // Near Clip
        100, // Far Clip
    );

    // Rückstellung der Kamera
    camera.position.set(0, 15, 20);

    camera.lookAt(new Vector3(0, 0, 0));

    return camera;
}

export { createCamera };