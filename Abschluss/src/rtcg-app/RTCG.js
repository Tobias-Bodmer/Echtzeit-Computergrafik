import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import { createSpotLight } from './components/light.js';
import { createControls } from './components/controller.js';
import { createCamera } from './components/camera.js';
import { createScene } from './components/scene.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Character } from './components/Character.js';
import { Anim_loop } from './systems/Anim_loop.js';
import { createGameBoard } from './components/board.js';
import { fight } from './components/figth.js';

let canvas;
let camera;
let renderer;
let scene;
let controller;
let resizer;
let player;
let stateScreen = document.getElementById("states");;
let enemies = [];

let anim_loop;


class RTCG {

    constructor(container) {
        canvas = document.querySelector("#scene-container");

        camera = createCamera();
        scene = createScene();
        renderer = createRenderer();

        anim_loop = new Anim_loop(camera, scene, renderer);

        container.append(renderer.domElement);

        resizer = new Resizer(container, camera, renderer);

        resizer.now_resize = () => {
            this.render();
            this.iniStates();
        }

        this.iniLevel();
        this.iniStates();
        document.body.appendChild(stateScreen);


        controller = createControls(camera, document.querySelector("canvas"));
    }

    iniLevel() {
        const gameBoard = createGameBoard(21, 21, "white");
        gameBoard.forEach(element => {
            scene.add(element);
        });

        const enemy = new Character("1", 100, 100, 80, 20);
        enemy.geometry.position.y = 1;
        enemy.geometry.position.z = -18;
        enemies.push(enemy);
        scene.add(enemy.geometry);

        player = new Character("Player", 100, 100, 80, 20);
        player.geometry.material.color = new THREE.Color("green");
        player.geometry.position.y = 1;
        player.geometry.position.z = -1;
        scene.add(player.geometry);

        const light = createSpotLight();
        scene.add(light.keyLight);
        scene.add(light.ambientLight);
    }

    iniStates() {        
        stateScreen.style.background = "white";
        stateScreen.style.width = window.innerWidth + "px";
        stateScreen.style.height = window.innerHeight + "px";

        var fightDiv = document.getElementsByClassName("figth")[0];
        fightDiv.style.width = window.innerWidth + "px";
        fightDiv.style.height = window.innerHeight + "px";
    }

    onMouseDown(event) {
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects(scene.children, false);

        if (intersects[0] != undefined && enemies.find(enemy => enemy.geometry.position == intersects[0].object.position) == null) {
            player.geometry.position.x = intersects[0].object.position.x;
            player.geometry.position.z = intersects[0].object.position.z;
        } else if (intersects[0] != undefined && enemies.find(enemy => enemy.geometry.position == intersects[0].object.position) != null) {
            if(player.geometry.position.distanceTo(intersects[0].object.position) > 1.5) {
                player.geometry.position.x = intersects[0].object.position.x;
                player.geometry.position.z = intersects[0].object.position.z+1;
            }

            canvas.style.display = "none";
            fight(enemies.find(enemy => enemy.geometry.position == intersects[0].object.position), player);
        }

        // controller.reset();
    }

    onTabDown(event) {
        if (canvas.style.display == "none") {
            canvas.style.display = "block"
        } else {
            canvas.style.display = "none";
        }
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