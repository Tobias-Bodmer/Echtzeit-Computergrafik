import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/OrbitControls.js';

function createControls(camera, canvas) {

    const controls = new OrbitControls(camera, canvas);

    controls.target.set(0, 5, 0);

    controls.update();
}

export { createControls };