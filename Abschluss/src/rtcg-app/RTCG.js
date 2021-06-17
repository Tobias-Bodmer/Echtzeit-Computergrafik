import { ARButton } from 'https://unpkg.com/three@0.126.0/examples/jsm/webxr/ARButton.js';
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
import { damage, fight } from './components/fight.js';

let canvas;
let camera;
let renderer;
let scene;
let controller;
let resizer;
let player;
let currentEnemy;
let stateScreen = document.getElementById("states");;
let enemies = [];

let haveDiced = false;

let anim_loop;


class RTCG {

    constructor(container) {
        document.body.appendChild(ARButton.createButton(renderer));
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

    async iniLevel() {
        const gameBoard = createGameBoard(21, 21, "white", "./src/texture/new_DefaultMaterial_BaseColor.png", "./src/texture/new_DefaultMaterial_Normal.png");
        gameBoard.forEach(element => {
            scene.add(element);
        });

        const enemy = new Character("1", 100, 30, 20, 40, "./src/img/Sixfeet_colorFinal.jpg");
        await enemy.loadModel("./src/modells/Dwarf.gltf");
        enemy.geometry.position.y = 1;
        enemy.geometry.position.z = -18;
        enemies.push(enemy);
        scene.add(enemy.geometry);

        player = new Character("Player", 100, 70, 30, 20, "./src/img/dwarf_color1.jpg");
        await player.loadModel("./src/modells/Dwarf.gltf");
        player.geometry.position.y = 1;
        player.geometry.rotation.y = Math.PI;
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

        var fightDiv = document.getElementsByClassName("fight")[0];
        fightDiv.style.width = window.innerWidth + "px";
        fightDiv.style.height = window.innerHeight + "px";
    }

    rollTheDice() {
        if (!haveDiced) {
            var newNumber = Math.floor(Math.random() * 12) + 1;
            document.getElementById("diceNumber").innerHTML = newNumber.toString();

            damage(currentEnemy, player, newNumber, player, scene);
            haveDiced = !haveDiced;
            setTimeout(() => {
                var newNumber = Math.floor(Math.random() * 12) + 1;
                damage(player, currentEnemy, newNumber, player, scene);
                haveDiced = !haveDiced;
            }, 1000)
        }
    }

    onMouseDown(e) {
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        if (e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel') {
            var evt = (typeof e.originalEvent === 'undefined') ? e : e.originalEvent;
            var touch = evt.touches[0] || evt.changedTouches[0];
            mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
            mouse.y = - (touch.clientY / window.innerHeight) * 2 + 1;
        } else {
            mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;
        }

        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects(scene.children, false);

        if (intersects[0] != undefined && enemies.find(enemy => enemy.geometry == intersects[0].object) == null) {
            player.geometry.position.x = intersects[0].object.position.x;
            player.geometry.position.z = intersects[0].object.position.z;
        } else if (intersects[0] != undefined && enemies.find(enemy => enemy.geometry == intersects[0].object) != null) {
            if (player.geometry.position.distanceTo(intersects[0].object.position) > 1.5) {
                player.geometry.position.x = intersects[0].object.position.x;
                player.geometry.position.z = intersects[0].object.position.z + 1;
            }

            setTimeout(() => {
                canvas.style.display = "none";
                currentEnemy = enemies.find(enemy => enemy.geometry == intersects[0].object);
                enemies = enemies.find(enemy => enemy.geometry != intersects[0].object);
                if (enemies == undefined) {
                    enemies = [];
                }
                fight(currentEnemy, player);
            }, 800);
        }
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