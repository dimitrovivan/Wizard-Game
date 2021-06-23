import { getDomElements } from "../domHandler.js";

const scoreElement = getDomElements.score();
const healthElement = getDomElements.health();

function addScore(score) {
    let previousScore = Number(scoreElement.innerText);
    scoreElement.innerText = Number(score) + previousScore;
}

function subtractScore(score) {
    let previousScore = Number(scoreElement.innerText);
    if(previousScore - score > 0) scoreElement.innerText = previousScore - Number(score);
}

function subtractHealth(num) {
    let previousHealth = Number(healthElement.innerText);
    if(previousHealth - num >= 0) healthElement.innerText = previousHealth - Number(num);
}

export {
    addScore,
    subtractScore,
    subtractHealth
}