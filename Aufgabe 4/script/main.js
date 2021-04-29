import * as THREE from '../three/three.module.js'

/* ======== Erzeugung unserer THREE.js App ======== */
const my_scene = new THREE.Scene();

const my_camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const my_renderer = new THREE.WebGLRenderer({ antialias: true });

my_renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(my_renderer.domElement);

const geometry = new THREE.BoxGeometry();

var cube_materials = [
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/texture1.jpg'), side: THREE.FrontSide }),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/texture1.jpg'), side: THREE.FrontSide }),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/texture1.jpg'), side: THREE.FrontSide }),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/texture1.jpg'), side: THREE.FrontSide }),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/texture1.jpg'), side: THREE.FrontSide }),
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('./img/texture1.jpg'), side: THREE.FrontSide })
];

const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

const cube = new THREE.Mesh(geometry, cube_materials);

my_scene.add(cube);
my_camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    my_renderer.render(my_scene, my_camera);
}
animate();