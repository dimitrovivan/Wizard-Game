import { getKeyCode } from './config/controls.js';
import { getDomElements, createDomElement} from './domHandler.js';
import wizardConfig from './config/wizard.js';
import fireballConfig from './config/fireball.js';
import witchConfig from './config/witch.js';
import levels from './config/levels.js';

const keys = {};
const userGameControllers = [];
const headerElement = getDomElements.header();
const gameScreen = getDomElements.gameScreen();
const scoreElement = getDomElements.score();
let lastShot = 0;
let lastSpawnedWitch = 0;
let playTime;
let firstLevel = false;
let secondLevel = false;
let thirdLevel = false;


const boundries = {
    top: headerElement.offsetHeight,
    left: 0,
    right: gameScreen.offsetWidth - wizardConfig.width - 5,
    bottom: gameScreen.offsetHeight - wizardConfig.height / 2
}

function runGame() {
    playTime = new Date().getTime();
    window.requestAnimationFrame(runOnFrame(0));
}

const runOnFrame = t1 => t2 => {
    movePlayer();
    shoot(t2);
    moveAllFireballs();
    moveAllWitches();
    randomWitchSpawn(t2);
    levelCheck();

    if (t2 - t1 > 500) {
        addScore(1);
        window.requestAnimationFrame(runOnFrame(t2));
    } 
    else {
        window.requestAnimationFrame(runOnFrame(t1));
    }
}

function IsValidKeyPressed(e) {
    return userGameControllers.find(controller => e.key == getKeyCode(controller)) ? true : false;
}

function onKeyDownSaveCode(e) {
    if (IsValidKeyPressed(e)) keys[e.key] = true;
}

function onKeyUpDeleteCode(e) {
    if (IsValidKeyPressed(e)) keys[e.key] = false;
}

function saveKeyboardControllers(keyboardControls) {
    keyboardControls.map(controller => userGameControllers.push(controller));
}

function levelCheck() {
    let date = new Date();

    if(date.getTime() - playTime > levels.first && !firstLevel) {
        changeDifficulty();
        firstLevel = true;
    } else if(date.getTime() - playTime > levels.second && !secondLevel) {
        changeDifficulty();
        secondLevel = true;
    } else if(date.getTime() -playTime > levels.third && !thirdLevel) {
        changeDifficulty();
        thirdLevel = true;
    }
}

function changeDifficulty() {
    witchConfig.minTimeSpawn -= 250;
    fireballConfig.timeLimit -= 100;
    witchConfig.speed += 1.5;
    fireballConfig.speed += 1.5;
    wizardConfig.speed += 1.5;
}

function movePlayer() {
    let wizard = getDomElements.wizard();
    let [upKey, leftKey, rightKey, downKey] = userGameControllers;
    let isAtBottom = wizardConfig.top < boundries.bottom;

    if (keys[getKeyCode(upKey)] && wizardConfig.top > boundries.top) wizardConfig.top -= wizardConfig.speed + 3;
    if (keys[getKeyCode(downKey)] && wizardConfig.top < boundries.bottom) wizardConfig.top += wizardConfig.speed;
    if (keys[getKeyCode(leftKey)] && wizardConfig.left > boundries.left) wizardConfig.left -= wizardConfig.speed;
    if (keys[getKeyCode(rightKey)] && wizardConfig.left < boundries.right) wizardConfig.left += wizardConfig.speed;

    if (isAtBottom) wizardConfig.top += 2;
    wizard.style.top = `${wizardConfig.top}px`;
    wizard.style.left = `${wizardConfig.left}px`;
}

function shoot(timestamp) {
    let wizard = getDomElements.wizard();
    let shootKey = userGameControllers[4];
    let isShootingAvaiable = (timestamp - lastShot) > fireballConfig.timeLimit;

    if (keys[getKeyCode(shootKey)]) {
        wizard.classList.add('wizard--fire');

        if(isShootingAvaiable) {
            createFireball();
            lastShot = timestamp;
        }

    } else {
        wizard.classList.remove('wizard--fire');
    }
}

function createFireball() {
    let fireball = createDomElement('div', '', {'class': 'fireball'});
    fireball.style.left = `${wizardConfig.left + wizardConfig.width}px`;
    fireball.style.top = `${wizardConfig.top + 15}px`;
    gameScreen.appendChild(fireball);
}

function addScore(score) {
    let previousScore = Number(scoreElement.innerText);
    scoreElement.innerText = Number(score) + previousScore;
}

function moveAllFireballs() {
    let allFireballs = getDomElements.fireballs();
    if(allFireballs.length < 1) return;

    Array.from(allFireballs).forEach(fireball => {
        let previousPosition = Number(fireball.style.left.slice(0, -2));
        let nextPosition = previousPosition + fireballConfig.speed;

        if(nextPosition > gameScreen.offsetWidth - fireball.offsetWidth) {
            fireball.parentElement.removeChild(fireball);
            return;
        } 
        fireball.style.left = `${nextPosition}px`;
    })
}

function createWitch(){
    let witch = createDomElement('div', '', {'class': 'witch'})
    let randomTop = (gameScreen.offsetHeight - witchConfig.height) * Math.random() + witchConfig.height / 2;
    witch.style.left = `${gameScreen.offsetWidth + witchConfig.width}px`;
    witch.style.top = `${randomTop}px`;
    gameScreen.appendChild(witch);
}

function moveAllWitches() {
    let allWitches = getDomElements.witches();
    if(allWitches.length < 1) return;

    Array.from(allWitches).forEach(witch => {
        let previousPosition = Number(witch.style.left.slice(0, -2));
        let nextPosition = previousPosition - witchConfig.speed;

        if(nextPosition < 0) {
            witch.parentElement.removeChild(witch);
            return;
        } 
        witch.style.left = `${nextPosition}px`;
    })
}

function randomWitchSpawn(timestamp) {
    if((timestamp - lastSpawnedWitch) > witchConfig.minTimeSpawn + (500 * Math.random()) + 300) {
        createWitch();
        lastSpawnedWitch = timestamp;
    }
}

export {
    runGame,
    saveKeyboardControllers,
    onKeyDownSaveCode,
    onKeyUpDeleteCode
}