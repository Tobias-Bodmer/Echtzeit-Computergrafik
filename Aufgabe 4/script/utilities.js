utilities()

function utilities() {
    
    /* ======== Erzeugung eines FPS Zählers ======== */

    const fps_element = document.querySelector("#fps_counter");
    let vergangen = 0;

    function render(aktuell) {
        aktuell *= 0.001;
        const deltaTime = aktuell - vergangen;
        vergangen = aktuell;
        const fps = 1 / deltaTime;
        fps_element.textContent = fps.toFixed(1);
        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}