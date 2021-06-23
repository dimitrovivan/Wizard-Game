import { getDomElements } from './domHandler.js';
import { randomWitchSpawn, moveAllWitches } from './actions/witch.js';
import { levelCheck } from './actions/levels.js';
import { shoot, moveAllFireballs } from './actions/wizard.js';
import { movePlayer } from './actions/controls.js';

const scoreElement = getDomElements.score();
let lastShoot = 0;
let lastSpawnedWitch = 0;
let playTime;

function runGame() {
    playTime = new Date().getTime();
    window.requestAnimationFrame(runOnFrame(0));
}

const runOnFrame = t1 => t2 => {
    movePlayer();
    lastShoot = shoot(t2, lastShoot);
    moveAllFireballs();
    moveAllWitches();
    lastSpawnedWitch = randomWitchSpawn(t2, lastSpawnedWitch);
    levelCheck(playTime);

    if (t2 - t1 > 500) {
        addScore(1);
        window.requestAnimationFrame(runOnFrame(t2));
    } 
    else {
        window.requestAnimationFrame(runOnFrame(t1));
    }
}

function addScore(score) {
    let previousScore = Number(scoreElement.innerText);
    scoreElement.innerText = Number(score) + previousScore;
}

export {
    runGame
}