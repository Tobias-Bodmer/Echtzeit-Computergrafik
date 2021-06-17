import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r126/examples/jsm/controls/OrbitControls.js';

function createControls(camera, canvas) {

    const controls = new OrbitControls(camera, canvas);

    controls.target.set(0, 5, 0);

    controls.enableDamping = true;
    
    controls.tick = () => controls.update();

    controls.update();

    controls.saveState();

    return controls;
}

export { createControls };