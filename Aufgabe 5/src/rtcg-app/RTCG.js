import { createSpotLight } from './components/light.js';
import { createControls } from './components/controller.js';
import { createCamera } from './components/camera.js';
import { createCube } from './components/box.js';
import { createPlane } from './components/plane.js';
import { createSphere } from './components/sphere.js';
import { createScene } from './components/scene.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Vector3 } from 'https://unpkg.com/three@0.127.0/build/three.module.js';

let camera;
let renderer;
let scene;
let resizer;

let animation = false;

class RTCG {

    constructor(container) {
        camera = createCamera();
        scene = createScene();
        renderer = createRenderer();
        container.append(renderer.domElement);

        resizer = new Resizer(container, camera, renderer);

        resizer.now_resize = () => {
            this.render();
        }

        const plane = createPlane(30, 30, 64, "grey", 0.25);
        plane.position.y = -2;
        plane.rotation.x = -Math.PI / 2;
        scene.add(plane);

        const cube = createCube();
        cube.position.y = -1;
        scene.add(cube);

        const sphere = createSphere();
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
    
    animate() {
        scene.children[1].rotation.y += 0.01;
        
        if (scene.children[2].position.y <= 3 && !animation)
        {
            scene.children[2].position.y += 0.01;
        } else {
            animation = true;
            scene.children[2].position.y -= 0.01;
        }

        if (scene.children[2].position.y <= 0) {
            animation = false;
        }

        renderer.render(scene, camera);
    }
}

export { RTCG };