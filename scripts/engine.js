import baseConfig from './config/base.js';
import { getDomElements } from './domHandler.js';
import { randomWitchSpawn, moveAllWitches, removeAllWitches } from './actions/witch.js';
import { levelCheck } from './actions/levels.js';
import { shoot, moveAllFireballs, removeAllFireballs, removeWizard } from './actions/wizard.js';
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
 
    if(!baseConfig.isActiveGame) {
        setTimeout( () => {
            removeAllWitches();
            removeWizard();
            removeAllFireballs();
            showGameOver();
        } , 1500)

        return;
    }
    
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

function showGameOver() {
    let playedTime = Math.ceil((Number(new Date().getTime()) - Number(playTime)) / 1000);
    let gameOverSection = getDomElements.gameOverSection();
    let finalScoreSection = gameOverSection.querySelector('.game-over__score-value');
    let playedTimeSection = gameOverSection.querySelector('.game-over__time-value');
    let hours = Math.floor(playedTime / 3600);
    let minutes = Math.floor((playedTime % 3600) / 60);
    let seconds = playedTime % 60;
    playedTimeSection.innerText = `${hours > 0 ? hours + ':': ''}${minutes > 0 ? minutes + ':': ''}${seconds}s`;
    finalScoreSection.innerText = scoreElement.innerText;
    gameOverSection.classList.add('appear');
}

export {
    runGame
}