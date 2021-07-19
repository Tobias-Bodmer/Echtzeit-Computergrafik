import { Clock } from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r126/three.module.js';

const clock = new Clock();

const fps_element = document.querySelector("#fps_counter");
var lastCalledTime;
var fps;

class Anim_loop {

    constructor(_camera, _scene, _renderer) {
        this.camera = _camera;
        this.scene = _scene;
        this.renderer = _renderer;
        this.animated_objects = [];
    }

    start() {
        this.renderer.setAnimationLoop(() => {
            this.tick();

            this.renderer.render(this.scene, this.camera);
        });
    }

    stop() {
        this.renderer.setAnimationLoop(null);
    }

    tick() {
        const delta = clock.getDelta();

        this.fps();

        for (const object of this.animated_objects) {
            object.tick(delta);
        }
    }

    fps() {
        if (!lastCalledTime) {
            lastCalledTime = Date.now();
            fps = 0;
            return;
        }
        var fpsDelta = (Date.now() - lastCalledTime) / 1000;
        lastCalledTime = Date.now();
        fps = 1 / fpsDelta;

        if(fps.toFixed(1) < 60) {
            fps_element.innerHTML = fps.toFixed(1);
        } else {
            fps_element.innerHTML = "60";
        }
    }

}

export { Anim_loop }