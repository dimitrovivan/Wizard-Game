import wizardConfig from '../config/wizard.js';
import fireballConfig from '../config/fireball.js';
import witchConfig from '../config/witch.js';
import levels from '../config/levels.js';

const levelPassed = {
    firstLevel: false,
    secondLevel: false,
    thirdLevel: false
}

function levelCheck(playTime) {
    let date = new Date();

    if(date.getTime() - playTime > levels.first && !levelPassed.firstLevel) {
        console.log(1);
        changeDifficulty();
        levelPassed.firstLevel = true;
    } else if(date.getTime() - playTime > levels.second && !levelPassed.secondLevel) {
        console.log(2);
        changeDifficulty();
        levelPassed.secondLevel = true;
    } else if(date.getTime() - playTime > levels.third && !levelPassed.thirdLevel) {
        console.log(3);
        changeDifficulty();
        levelPassed.thirdLevel = true;
    }
}

function changeDifficulty() {
    witchConfig.minTimeSpawn -= 250;
    fireballConfig.timeLimit -= 100;
    witchConfig.speed += 1.5;
    fireballConfig.speed += 1.5;
    wizardConfig.speed += 1.5;
}

export {
    levelCheck
}
