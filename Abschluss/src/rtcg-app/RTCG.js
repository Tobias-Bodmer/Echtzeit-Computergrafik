import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import { createCube, createPlane, createSphere, createTestScene } from './components/geometry.js';
import { createSpotLight } from './components/light.js';
import { createControls } from './components/controller.js';
import { createCamera } from './components/camera.js';
import { createScene } from './components/scene.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Player } from './components/Player.js';
import { Anim_loop } from './systems/Anim_loop.js';

let camera;
let renderer;
let scene;
let resizer;
let player;

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

        player = new Player("hello");
        console.log(player);
        scene.add(player.geometry);

        const cube = createCube(1, "white", 0.25);
        cube.position.z = -8;
        scene.add(cube);

        // anim_loop.animated_objects.push(cube);

        const light = createSpotLight();
        scene.add(light.keyLight);
        scene.add(light.ambientLight);

        createControls(camera, document.querySelector("canvas"));
    }

    onMouseDown(event) {
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects(scene.children, false);

        // player.geometry.position.x = intersects[0].object.position.x;
        // player.geometry.position.y = intersects[0].object.position.y;
        player.geometry.position.z = intersects[0].object.position.z;
    }
    render() {

        renderer.render(scene, camera);

        this.start();
    }

    start() {
        anim_loop.start();
    }

    stop() {
        anim_loop.stop();
    }
}

export { RTCG };