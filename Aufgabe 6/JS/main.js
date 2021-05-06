import { RTCG } from '../src/rtcg-app/RTCG.js';

function main() {
    const container = document.querySelector("#scene-container");

    const ins_RTCG = new RTCG(container);

    ins_RTCG.start();
}

main();