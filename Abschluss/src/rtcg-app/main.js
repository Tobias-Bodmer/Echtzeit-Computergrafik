import { RTCG } from './RTCG.js';

function main() {
    const container = document.querySelector("#scene-container");

    const ins_RTCG = new RTCG(container);

    container.addEventListener("click", ((event) => {
        ins_RTCG.onMouseDown(event);
    }), false);

    document.addEventListener("keydown", ((event) => {
        if (event.key == "Tab" || event.key.toLowerCase() == "i" || event.key.toLowerCase() == "e") {
            ins_RTCG.onTabDown(event);
        }
    }), false);

    ins_RTCG.start();
}

main();