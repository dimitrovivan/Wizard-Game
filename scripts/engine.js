import { getKeyCode } from './config/controls.js';
import { getDomElements, createDomElement} from './domHandler.js';
import wizardConfig from './config/wizard.js';
import fireballConfig from './config/fireball.js';

const keys = {};
const userGameControllers = [];
const headerElement = getDomElements.header();
const gameScreen = getDomElements.gameScreen();
const scoreElement = getDomElements.score();
let lastShot = 0;

const boundries = {
    top: headerElement.offsetHeight,
    left: 0,
    right: gameScreen.offsetWidth - wizardConfig.width - 5,
    bottom: gameScreen.offsetHeight - wizardConfig.height / 2
}

const runOnFrame = t1 => t2 => {
    move(t2);
    moveAllFireballs();
    if (t2 - t1 > 500) {
        addScore(1);
        window.requestAnimationFrame(runOnFrame(t2));
    } else {
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

function move(timestamp) {
    let wizard = getDomElements.wizard();
    let [up, left, right, down, shoot] = userGameControllers;
    let isAtBottom = wizardConfig.top < boundries.bottom;

    if (keys[getKeyCode(up)] && wizardConfig.top > boundries.top) wizardConfig.top -= wizardConfig.speed + 2;
    if (keys[getKeyCode(down)] && wizardConfig.top < boundries.bottom) wizardConfig.top += wizardConfig.speed;
    if (keys[getKeyCode(left)] && wizardConfig.left > boundries.left) wizardConfig.left -= wizardConfig.speed;
    if (keys[getKeyCode(right)] && wizardConfig.left < boundries.right) wizardConfig.left += wizardConfig.speed;

    if (keys[getKeyCode(shoot)]) {

        if(timestamp - lastShot > 1000) {
            createFireball();
            lastShot = timestamp;
        }
        wizard.classList.add('wizard--fire');
  
    } else {
        wizard.classList.remove('wizard--fire');
    }


    if (isAtBottom) wizardConfig.top += 2;
    wizard.style.top = `${wizardConfig.top}px`;
    wizard.style.left = `${wizardConfig.left}px`;

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

export {
    runOnFrame,
    saveKeyboardControllers,
    onKeyDownSaveCode,
    onKeyUpDeleteCode
}