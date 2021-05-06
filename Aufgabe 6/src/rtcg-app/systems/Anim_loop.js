import { Clock } from 'https://unpkg.com/three@0.127.0/build/three.module.js';

const clock = new Clock();

class Anim_loop {

    constructor(camera, scene, renderer) {
        this.camera = camera;
        this.scene = scene;
        this.renderer = renderer;
        this.animated_objects = [];
    }

    start() {
        this.renderer.setAnimationLoop(() => {

            this.tick();

            // Rendere einen Frame:
            this.renderer.render(this.scene, this.camera);
        });
    }

    stop() {
        this.renderer.setAnimationLoop(null);
    }

    tick() {

        // Bitte getDelta einmal pro Frame aufrufen!
        const delta = clock.getDelta();


        for (const object of this.animated_objects) {
            object.tick(delta);
        }
    }

}

export { Anim_loop }