import { GLTFLoader } from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader.js';

class Character {
    name;
    img;
    state = [];
    geometry;

    constructor(_name, _health, _strength, _agility, _intelligence, _img) {
        this.name = _name;
        this.img = _img;
        this.state.push(_health, _strength, _agility, _intelligence);
    }

    async loadModel(_modelUrl) {
        var loader = new GLTFLoader();
        const scene = await loader.loadAsync(_modelUrl);

        this.geometry = scene.scene.children[0];
        this.geometry.material = new THREE.MeshPhongMaterial()
        this.geometry.material.color = new THREE.Color(0xF3F3F3);
        console.log();
    }
}

export { Character };