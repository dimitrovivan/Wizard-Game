import { getKeyCode } from './config/controls.js';
import { getDomElements } from './domHandler.js';
import wizardConfig from './config/wizard.js';

const keys = {};
const userGameControllers = [];
const headerElement = getDomElements.header();
const gameScreen = getDomElements.gameScreen();

const boundries = {
    top: headerElement.offsetHeight,
    left: 0,
    right: gameScreen.offsetWidth - wizardConfig.width - 5,
    bottom: gameScreen.offsetHeight - wizardConfig.height / 2
}

function runOnFrame(timestamp) {
    move();
    window.requestAnimationFrame(runOnFrame);
}

function IsValidKeyPressed(e) {
    return userGameControllers.find(controller => e.key == controller) ? true : false;
 }
 
 function onKeyDownSaveCode(e) {
     if(IsValidKeyPressed(e)) keys[e.key] = true;
 }
 
 function onKeyUpDeleteCode(e) {
     if(IsValidKeyPressed(e)) keys[e.key] = false;
 }

 function saveKeyboardControllers(keyboardControls) {
    keyboardControls.map(controller => userGameControllers.push(controller));
 }

 function move() {
     let wizard = getDomElements.wizard();
     let [up, left, right, down, shoot] = userGameControllers;
     let isAtBottom = wizardConfig.top < boundries.bottom;
     console.log(wizardConfig.left < boundries.right);

     if(keys[getKeyCode(up)] && wizardConfig.top > boundries.top) wizardConfig.top -= wizardConfig.speed + 2;
     if(keys[getKeyCode(down)] && wizardConfig.top < boundries.bottom) wizardConfig.top += wizardConfig.speed;
     if(keys[getKeyCode(left)] && wizardConfig.left > boundries.left) wizardConfig.left -= wizardConfig.speed;
     if(keys[getKeyCode(right)] && wizardConfig.left < boundries.right) wizardConfig.left += wizardConfig.speed;

     if(isAtBottom) wizardConfig.top += 2;
     wizard.style.top = `${wizardConfig.top}px`;
     wizard.style.left = `${wizardConfig.left}px`;

 }

export {
    runOnFrame,
    saveKeyboardControllers,
    onKeyDownSaveCode,
    onKeyUpDeleteCode
}