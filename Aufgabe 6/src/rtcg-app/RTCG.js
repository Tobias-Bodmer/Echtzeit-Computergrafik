import { createCube, createPlane, createSphere, createTestScene } from './components/geometry.js';
import { createSpotLight } from './components/light.js';
import { createControls } from './components/controller.js';
import { createCamera } from './components/camera.js';
import { createScene } from './components/scene.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Anim_loop } from './systems/Anim_loop.js';

let camera;
let renderer;
let scene;
let resizer;

let anim_loop;


class RTCG {

    constructor(container) {
        camera = createCamera();
        scene = createScene();
        // scene = createTestScene(6, 6, 2);
        renderer = createRenderer();

        anim_loop = new Anim_loop(camera, scene, renderer);

        container.append(renderer.domElement);

        resizer = new Resizer(container, camera, renderer);

        resizer.now_resize = () => {
            this.render();
        }

        const plane = createPlane(30, 30, 64, "grey", 0.25);
        plane.position.y = -2;
        plane.rotation.x = -Math.PI / 2;
        scene.add(plane);

        const cube = createCube(2, "white", 0.25);
        scene.add(cube);

        anim_loop.animated_objects.push(cube);

        const sphere = createSphere(2, 32, 32, "green", 0.25);
        sphere.position.set(4, 0, 0);
        scene.add(sphere);

        const light = createSpotLight();
        scene.add(light.keyLight);
        scene.add(light.ambientLight);

        createControls(camera, document.querySelector("canvas"));
    }

    render() {

        renderer.render(scene, camera);

        renderer.setAnimationLoop(this.animate);
    }

    start() {
        anim_loop.start();
    }

    stop() {
        anim_loop.stop();
    }
}

export { RTCG };