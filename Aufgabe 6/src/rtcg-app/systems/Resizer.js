const resize = (container, camera, renderer) => {
    // 1
    camera.aspect = container.clientWidth / container.clientHeight;

    // Aktualisierung des Kamera-Frustums
    camera.updateProjectionMatrix();

    // 2
    renderer.setSize(container.clientWidth, container.clientHeight);

    // 3
    renderer.setPixelRatio(window.devicePixelRatio);
};

class Resizer {

    constructor(container, camera, renderer) {
        resize(container, camera, renderer);

        window.addEventListener("resize", () => {
            resize(container, camera, renderer);

            this.now_resize();
        })
    }

    now_resize() {}
}

export { Resizer };