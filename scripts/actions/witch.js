import witchConfig from '../config/witch.js';
import { getDomElements, createDomElement } from '../domHandler.js';

const gameScreen = getDomElements.gameScreen();

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

function randomWitchSpawn(timestamp, lastSpawnedWitch) {
    if((timestamp - lastSpawnedWitch) > witchConfig.minTimeSpawn + (500 * Math.random()) + 300) {
        createWitch();
        lastSpawnedWitch = timestamp;
    }

    return lastSpawnedWitch;
}

export {
    createWitch,
    moveAllWitches,
    randomWitchSpawn
}