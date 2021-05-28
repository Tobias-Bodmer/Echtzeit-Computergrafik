import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';

function fight(enemy, player) {
    iniTable(enemy, player);

    
}

function iniTable(enemy, player) {
    var fightDiv = document.getElementsByClassName("figth")[0];
    fightDiv.style.display = "grid";

    document.getElementById("playerHealth").innerHTML = player.state[0];
    document.getElementById("playerStrength").innerHTML = player.state[1];
    document.getElementById("playerAgility").innerHTML = player.state[2];
    document.getElementById("playerIntelligence").innerHTML = player.state[3];
    document.getElementById("enemyHealth").innerHTML = enemy.state[0];
    document.getElementById("enemyStrength").innerHTML = enemy.state[1];
    document.getElementById("enemyAgility").innerHTML = enemy.state[2];
    document.getElementById("enemyIntelligence").innerHTML = enemy.state[3];
}

export { fight };