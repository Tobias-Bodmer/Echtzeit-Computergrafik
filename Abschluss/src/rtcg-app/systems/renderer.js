function createRenderer() {
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
    });

    renderer.physicallyCorrectLights = true;
    renderer.shadowMap.enabled = true;
    renderer.xr.enabled = true;

    return renderer;
}

export { createRenderer };