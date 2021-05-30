import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';

function fight(enemy, player) {
    var fightDiv = document.getElementById("fight");
    fightDiv.style.display = "block";
    iniTable(enemy, player);
}

function iniTable(enemy, player) {
    document.getElementById("playerHealth").innerHTML = player.state[0];
    document.getElementById("playerStrength").innerHTML = player.state[1];
    document.getElementById("playerAgility").innerHTML = player.state[2];
    document.getElementById("playerIntelligence").innerHTML = player.state[3];
    document.getElementById("enemyHealth").innerHTML = enemy.state[0];
    document.getElementById("enemyStrength").innerHTML = enemy.state[1];
    document.getElementById("enemyAgility").innerHTML = enemy.state[2];
    document.getElementById("enemyIntelligence").innerHTML = enemy.state[3];

    document.getElementById("playerPicSrc").src = player.img;
    document.getElementById("enemyPicSrc").src = enemy.img;
}

//TODO: start needs better name
function damage(target, start, dice, player, scene) {
    if ((target.state[0] - Math.floor(start.state[1] * dice / 20)) > 0) {
        target.state[0] -= Math.floor(start.state[1] * dice / 20);

        if (target == player) {
            iniTable(start, player);
        } else {
            iniTable(target, player);
        }
    } else {
        target.state[0] = 0;

        if (target == player) {
            iniTable(start, player);
            //TODO: GAME OVER
        } else {
            iniTable(target, player);
            setTimeout(() => {
                var fightDiv = document.getElementById("fight");
                fightDiv.style.display = "none";

                document.getElementById("scene-container").style.display = "block";

                scene.remove(target.geometry);
            }, 1000)
        }
    }
}

export { fight, damage };