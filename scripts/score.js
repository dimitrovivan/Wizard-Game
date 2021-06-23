import { getDomElements } from "./domHandler.js";

const scoreElement = getDomElements.score();

function addScore(score) {
    let previousScore = Number(scoreElement.innerText);
    scoreElement.innerText = Number(score) + previousScore;
}

export {
    addScore
}