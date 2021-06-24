import fireballConfig from '../config/fireball.js';
import witchConfig from '../config/witch.js';
import levels from '../config/levels.js';
import baseConfig from '../config/base.js';

function levelCheck(playTime) {
    let date = new Date();

    if(date.getTime() - playTime > levels.firstLevelTime && !levels.isPassedFirstLevel) {
        changeDifficulty();
        levels.isPassedFirstLevel = true;
    } else if(date.getTime() - playTime > levels.secondLevelTime && !levels.isPassedSecondLevel) {
        changeDifficulty();
        levels.isPassedSecondLevel = true;
    } else if(date.getTime() - playTime > levels.thirdLevelTime && !levels.isPassedThirdLevel) {
        changeDifficulty();
        levels.isPassedThirdLevel = true;
    }
}

function changeDifficulty() {
    witchConfig.minTimeSpawn -= 250;
    fireballConfig.timeLimit -= 100;
    baseConfig.SPEED_MULTIPLIER += 1;
}

export {
    levelCheck
}
