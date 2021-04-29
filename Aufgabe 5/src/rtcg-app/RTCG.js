import { createSpotLight } from './components/light.js';
import { createControls } from './components/controller.js';
import { createCamera } from './components/camera.js';
import { createCube } from './components/box.js';
import { createPlane } from './components/plane.js';
import { createSphere } from './components/sphere.js';
import { createScene } from './components/scene.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';

let camera;
let renderer;
let scene;
let resizer;

class RTCG {
    // 1. Erstellung einer Instanz der RTCG-App
    constructor(container) {
        camera = createCamera();
        scene = createScene();
        renderer = createRenderer();
        container.append(renderer.domElement);

        resizer = new Resizer(container, camera, renderer);

        resizer.now_resize = () => {
            this.render();
        }

        const plane = createPlane();
        plane.position.y = -5;
        plane.rotation.x = -Math.PI / 2;
        scene.add(plane);

        const cube = createCube();
        scene.add(cube);

        const sphere = createSphere();
        sphere.position.set(4, 0, 0);
        scene.add(sphere);

        const light = createSpotLight();
        scene.add(light.keyLight);
        scene.add(light.ambientLight);

        createControls(camera, document.querySelector("canvas"));
    }

    // 2. Rendering der Szene
    render() {

        // Rendering -> einzelner Frame
        renderer.render(scene, camera);

        renderer.setAnimationLoop(this.animate);
    }

    animate() {
        scene.children[1].rotation.y += 0.01;

        renderer.render(scene, camera);
    }
}

export { RTCG };