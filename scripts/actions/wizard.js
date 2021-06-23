import wizardConfig from '../config/wizard.js';
import fireballConfig from '../config/fireball.js';
import {userGameControllers, getKeyCode} from '../config/controls.js';
import { getDomElements, createDomElement } from '../domHandler.js';
import { keys } from './controls.js';
import { isCollision } from '../collision.js';
import { addScore } from '../actions/ingameInteraction.js';

const gameScreen = getDomElements.gameScreen();

function shoot(timestamp, lastShoot) {
    let wizard = getDomElements.wizard();
    let shootKey = userGameControllers[4];
    let isShootingAvaiable = (timestamp - lastShoot) > fireballConfig.timeLimit;

    if (keys[getKeyCode(shootKey)]) {
        wizard.classList.add('wizard--fire');

        if(isShootingAvaiable) {
            createFireball();
            lastShoot = timestamp;
        }

    } else {
        wizard.classList.remove('wizard--fire');
    }

    return lastShoot;
}

function createFireball() {
    let fireball = createDomElement('div', '', {'class': 'fireball'});
    fireball.style.left = `${wizardConfig.left + wizardConfig.width}px`;
    fireball.style.top = `${wizardConfig.top + 15}px`;
    gameScreen.appendChild(fireball);
}

function moveAllFireballs() {
    let allFireballs = getDomElements.fireballs();
    if(allFireballs.length < 1) return;

   allFireballs.forEach(fireball => {
        let previousPosition = Number(fireball.style.left.slice(0, -2));
        let nextPosition = previousPosition + fireballConfig.speed;

        getDomElements.witches().forEach(witch => {
            if(!isCollision(witch, fireball)) return;
            witch.parentElement.removeChild(witch);
            fireball.parentElement.removeChild(fireball);
            addScore(10);
        })

        if(nextPosition > gameScreen.offsetWidth - fireball.offsetWidth) {
            fireball.parentElement.removeChild(fireball);
            return;
        } 
        fireball.style.left = `${nextPosition}px`;
    })
}

function showWizard() {
    let wizard = createDomElement('div', '', {'class': 'wizard'});
    wizard.style.width = `${wizardConfig.width}px`;
    wizard.style.height = `${wizardConfig.height}px`;
    wizard.style.top = `${wizardConfig.top}px`;
    wizard.style.left = `${wizardConfig.left}px`;
    gameScreen.appendChild(wizard);
}

function removeWizard() {
    let wizard = getDomElements.wizard();
    wizard.parentElement.removeChild(wizard);
}

function removeAllFireballs() {
    getDomElements.fireballs().forEach(fireball => fireball.parentElement.removeChild(fireball));
    
}



export {
    moveAllFireballs,
    shoot,
    showWizard,
    removeWizard,
    removeAllFireballs
}