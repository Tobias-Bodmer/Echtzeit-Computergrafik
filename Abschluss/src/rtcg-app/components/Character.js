import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import { createCuboid } from './geometry.js';

class Character {
    name;
    img;
    state = [];
    geometry;

    constructor(name, health, strength, agility, intelligence, img) {
        this.name = name;
        this.img = img;
        this.state.push(health, strength, agility, intelligence);
        this.geometry = createCuboid(1, 2, 1, "red", 0.25);
    }
}

export { Character };