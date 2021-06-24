import witchConfig from '../config/witch.js';
import { getDomElements, createDomElement } from '../domHandler.js';
import { isCollision } from '../collision.js';
import { subtractHealth } from './ingameInteraction.js';

const gameScreen = getDomElements.gameScreen();
let lastWitchHit = 0;

function createWitch(){
    let witch = createDomElement('div', '', {'class': 'witch'})
    let randomTop = (gameScreen.offsetHeight - witchConfig.height) * Math.random() + witchConfig.height / 2;
    witch.style.left = `${gameScreen.offsetWidth + witchConfig.width}px`;
    witch.style.top = `${randomTop}px`;
    gameScreen.appendChild(witch);
}

function moveAllWitches(timestamp) {
    let allWitches = getDomElements.witches();
    if(allWitches.length < 1) return;

    allWitches.forEach(witch => {
        let previousPosition = Number(witch.style.left.slice(0, -2));
        let nextPosition = previousPosition - witchConfig.getSpeed();

        if(isCollision(getDomElements.wizard(), witch) && timestamp - lastWitchHit > 1000) {
            subtractHealth(25);
            lastWitchHit = timestamp;
        }

        if(nextPosition < 0) {
            witch.parentElement.removeChild(witch);
            return;
        } 
        witch.style.left = `${nextPosition}px`;
    })
}

function randomWitchSpawn(timestamp, lastSpawnedWitch) {
    if((timestamp - lastSpawnedWitch) > witchConfig.minTimeSpawn + (500 * Math.random()) + 300) {
        createWitch();
        lastSpawnedWitch = timestamp;
    }

    return lastSpawnedWitch;
}

function removeAllWitches() {
     getDomElements.witches().forEach(witch => witch.parentElement.removeChild(witch));
}

export {
    createWitch,
    moveAllWitches,
    randomWitchSpawn,
    removeAllWitches
}