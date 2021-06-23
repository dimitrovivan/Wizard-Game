import wizardConfig from '../config/wizard.js';
import { userGameControllers, getKeyCode } from '../config/controls.js';
import { getDomElements } from '../domHandler.js';

const headerElement = getDomElements.header();
const gameScreen = getDomElements.gameScreen();
const keys = {};
const boundries = {
    top: headerElement.offsetHeight,
    left: 0,
    right: gameScreen.offsetWidth - wizardConfig.width - 5,
    bottom: gameScreen.offsetHeight - wizardConfig.height / 2
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

export {
    keys,
    movePlayer,
    onKeyDownSaveCode,
    onKeyUpDeleteCode
}