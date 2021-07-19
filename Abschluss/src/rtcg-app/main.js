import { RTCG } from './RTCG.js';

function main() {
    const container = document.querySelector("#scene-container");

    const ins_RTCG = new RTCG(container);

    document.addEventListener("click", ((event) => {
        ins_RTCG.onMouseDown(event);
    }), false);

    var mylatesttap;
    document.addEventListener("touchend", ((event) => {
        var now = new Date().getTime();
        var timesince = now - mylatesttap;
        if ((timesince < 100) && (timesince > 0)) {
            ins_RTCG.onTabDown(event);
        } else {
            ins_RTCG.onMouseDown(event);
        }

        mylatesttap = new Date().getTime();

    }), false);

    document.addEventListener("touchend", ((event) => {

        var now = new Date().getTime();
        var timesince = now - mylatesttap;
        if ((timesince < 300) && (timesince > 0)) {
            ins_RTCG.onTabDown(event);
        }
        mylatesttap = new Date().getTime();

    }), false);

    document.addEventListener("keydown", ((event) => {
        if (event.key == "Tab" || event.key.toLowerCase() == "i" || event.key.toLowerCase() == "e") {
            ins_RTCG.onTabDown(event);
        }
    }), false);

    document.getElementById("rollTheDice").addEventListener("click", (event) => { ins_RTCG.rollTheDice() });

    ins_RTCG.start();
}

main();