import { ARButton } from 'https://unpkg.com/three@0.126.0/examples/jsm/webxr/ARButton.js';
import * as THREEM from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r126/three.module.js';
import { createSpotLight } from './components/light.js';
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

let gameBoard;
let positionAttribute;

let haveDiced = false;

let anim_loop;


class RTCG {

    constructor(container) {
        canvas = document.querySelector("#scene-container");

        camera = createCamera();
        scene = createScene();
        renderer = createRenderer(canvas);

        document.body.appendChild(ARButton.createButton(renderer));

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

        controller = renderer.xr.getController(0);
        scene.add(controller);
    }

    async iniLevel() {
        let group = new THREEM.Group();
        gameBoard = createGameBoard(21, 21, "white", "./src/texture/new_DefaultMaterial_BaseColor.png", "./src/texture/new_DefaultMaterial_Normal.png", true);
        gameBoard.forEach(element => {
            group.add(element);
            positionAttribute = element.geometry.getAttribute('position');
        });

        const enemy = new Character("1", 100, 30, 20, 40, "./src/img/Sixfeet_colorFinal.jpg");
        await enemy.loadModel("./src/modells/Dwarf.gltf");
        enemy.geometry.position.y = 5;
        enemy.geometry.position.z = -18;
        enemies.push(enemy);
        group.add(enemy.geometry);

        player = new Character("Player", 100, 70, 30, 20, "./src/img/dwarf_color1.jpg");
        await player.loadModel("./src/modells/Dwarf.gltf");
        player.geometry.position.y = 5;
        player.geometry.rotation.y = Math.PI;
        player.geometry.position.z = -1;
        group.add(player.geometry);

        const light = createSpotLight();
        scene.add(light.keyLight);
        scene.add(light.ambientLight);

        group.applyMatrix4(new THREE.Matrix4().makeScale(0.02, 0.02, 0.02));
        group.applyMatrix4(new THREE.Matrix4().makeTranslation(0, -0.2, 0));

        scene.add(group);

        var target = new THREE.Vector3(); // create once an reuse it

        var ray = new THREEM.Raycaster();

        enemy.geometry.getWorldPosition(target);
        ray.set(target, new THREE.Vector3(0, -0.02, 0));
        enemy.geometry.position.y -= ray.intersectObjects(scene.children[3].children, false)[0].distance + 3;

        player.geometry.getWorldPosition(target);
        ray.set(target, new THREE.Vector3(0, -0.02, 0));
        player.geometry.position.y -= ray.intersectObjects(scene.children[3].children, false)[0].distance + 3;
    }

    iniStates() {
        stateScreen.style.width = window.innerWidth + "px";
        stateScreen.style.height = window.innerHeight + "px";

        var fightDiv = document.getElementsByClassName("fight")[0];
        fightDiv.style.width = window.innerWidth + "px";
        fightDiv.style.height = window.innerHeight + "px";
    }

    //doesn't work in AR
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

    onMouseDown(_event) {
        const raycaster = new THREEM.Raycaster();
        const mouse = new THREEM.Vector2();

        if (_event.type == 'touchstart' || _event.type == 'touchmove' || _event.type == 'touchend' || _event.type == 'touchcancel') {
            var evt = (typeof _event.originalEvent === 'undefined') ? _event : _event.originalEvent;
            var touch = evt.touches[0] || evt.changedTouches[0];
            mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
            mouse.y = - (touch.clientY / window.innerHeight) * 2 + 1;
        } else {
            mouse.x = (_event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = - (_event.clientY / window.innerHeight) * 2 + 1;
        }

        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects(scene.children[3].children, false);


        if (intersects[0] != undefined && enemies.find(enemy => enemy.geometry == intersects[0].object) == null) {
            player.geometry.position.x = Math.round(intersects[0].point.x / 0.02);
            player.geometry.position.y = 5;
            player.geometry.position.z = Math.round(intersects[0].point.z / 0.02);

            var playerRay = new THREEM.Raycaster();
            playerRay.set(new THREE.Vector3(intersects[0].point.x, 5, intersects[0].point.z), new THREE.Vector3(0, -1, 0));
            player.geometry.position.y -= playerRay.intersectObjects(scene.children[3].children, false)[0].distance - 2;

        } else if (intersects[0] != undefined && enemies.find(enemy => enemy.geometry == intersects[0].object) != null) {
            if (player.geometry.position.distanceTo(intersects[0].object.position) > 1.5) {
                player.geometry.position.x = intersects[0].object.position.x;
                player.geometry.position.y = 5;
                player.geometry.position.z = intersects[0].object.position.z + 1;

                var playerRay = new THREEM.Raycaster();
                playerRay.set(new THREE.Vector3(intersects[0].point.x, 5, intersects[0].point.z), new THREE.Vector3(0, -1, 0));
                player.geometry.position.y -= playerRay.intersectObjects(scene.children[3].children, false)[0].distance - 2;
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

    //doesn't work in AR
    onTabDown(_event) {
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