import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import { createCuboid } from './geometry.js';

let name;
let geometry;

class Player {
    constructor(name) {
        this.name = name;
        this.geometry = createCuboid(1, 2, 1, "red", 0.25);
    }
}

export {Player};