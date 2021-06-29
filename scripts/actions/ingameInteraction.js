import baseConfig from '../config/base.js'
import { getDomElements } from "../domHandler.js";

const scoreElement = getDomElements.score();
const healthElement = getDomElements.health();
const healthExtraInfo = getDomElements.healthExtraInfo();

function addScore(score) {
    let previousScore = Number(scoreElement.innerText);
    scoreElement.innerText = Number(score) + previousScore;
}

function subtractScore(score) {
    let previousScore = Number(scoreElement.innerText);
    if(previousScore - score > 0) scoreElement.innerText = previousScore - Number(score);
}

function getScore() {
    return scoreElement.innerText;
}

function subtractHealth(num) {
    let previousHealth = Number(healthElement.innerText);
    if(previousHealth - num > 0) healthElement.innerText = previousHealth - Number(num);
    else {
        healthElement.innerText = 0;
        baseConfig.isActiveGame = false;
    }
}

function showAdditionalHealthInfo(text) {
    healthExtraInfo.innerText = text;
    healthExtraInfo.classList.add('appear-inline-block')
}

function hideAdditionalHealthSection(afterSeconds = 0) {
    setTimeout( () => {
      healthExtraInfo.classList.remove('appear-inline-block');
    }, afterSeconds)
}

export {
    addScore,
    subtractScore,
    getScore,
    subtractHealth,
    showAdditionalHealthInfo,
    hideAdditionalHealthSection
}