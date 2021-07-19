const resize = (_container, _camera, _renderer) => {
    // 1
    _camera.aspect = _container.clientWidth / _container.clientHeight;

    // Aktualisierung des Kamera-Frustums
    _camera.updateProjectionMatrix();

    // 2
    _renderer.setSize(_container.clientWidth, _container.clientHeight);

    // 3
    _renderer.setPixelRatio(window.devicePixelRatio);
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