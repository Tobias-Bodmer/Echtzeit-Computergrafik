import { GLTFLoader } from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader.js';

class Character {
    name;
    img;
    state = [];
    geometry;

    constructor(name, health, strength, agility, intelligence, img) {
        this.name = name;
        this.img = img;
        this.state.push(health, strength, agility, intelligence);
    }
    
    async loadModel(modelUrl) {
        var loader = new GLTFLoader();
        const scene = await loader.loadAsync(modelUrl);

        this.geometry = scene.scene.children[0];
    }
}

export { Character };