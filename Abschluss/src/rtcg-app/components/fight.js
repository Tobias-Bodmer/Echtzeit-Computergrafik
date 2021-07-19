
function fight(_enemy, _player) {
    var fightDiv = document.getElementById("fight");
    fightDiv.style.display = "block";
    iniTable(_enemy, _player);
}

function iniTable(_enemy, _player) {
    document.getElementById("playerHealth").innerHTML = _player.state[0];
    document.getElementById("playerStrength").innerHTML = _player.state[1];
    document.getElementById("playerAgility").innerHTML = _player.state[2];
    document.getElementById("playerIntelligence").innerHTML = _player.state[3];
    document.getElementById("enemyHealth").innerHTML = _enemy.state[0];
    document.getElementById("enemyStrength").innerHTML = _enemy.state[1];
    document.getElementById("enemyAgility").innerHTML = _enemy.state[2];
    document.getElementById("enemyIntelligence").innerHTML = _enemy.state[3];

    document.getElementById("playerPicSrc").src = _player.img;
    document.getElementById("enemyPicSrc").src = _enemy.img;
}

function damage(_target, _offender, _dice, _player, _scene) {
    if ((_target.state[0] - Math.floor(_offender.state[1] * _dice / 20)) > 0) {
        _target.state[0] -= Math.floor(_offender.state[1] * _dice / 20);

        if (_target == _player) {
            iniTable(_offender, _player);
        } else {
            iniTable(_target, _player);
        }
    } else {
        _target.state[0] = 0;

        if (_target == _player) {
            iniTable(_offender, _player);
            //GAME OVER
        } else {
            iniTable(_target, _player);
            setTimeout(() => {
                var fightDiv = document.getElementById("fight");
                fightDiv.style.display = "none";

                document.getElementById("scene-container").style.display = "block";

                _scene.children[3].remove(_target.geometry);
            }, 1000)
        }
    }
}

export { fight, damage };