import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/OrbitControls.js';

function createControls(_camera, _canvas) {

    const controls = new OrbitControls(_camera, _canvas);

    controls.target.set(0, 5, 0);

    controls.enableDamping = true;
    
    controls.tick = () => controls.update();

    controls.update();

    controls.saveState();

    return controls;
}

export { createControls };