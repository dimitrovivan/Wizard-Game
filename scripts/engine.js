import { getKeyCode } from './config/controls.js';
import { getDomElements } from './domHandler.js';
import wizardConfig from './config/wizard.js';

const keys = {};
const userGameControllers = [];

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

     if(keys[getKeyCode(up)]) wizardConfig.top -= wizardConfig.speed;
     if(keys[getKeyCode(down)]) wizardConfig.top += wizardConfig.speed;
     if(keys[getKeyCode(left)]) wizardConfig.left -= wizardConfig.speed;
     if(keys[getKeyCode(right)]) wizardConfig.left += wizardConfig.speed;

     wizard.style.top = `${wizardConfig.top}px`;
     wizard.style.left = `${wizardConfig.left}px`;

 }

export {
    runOnFrame,
    saveKeyboardControllers,
    onKeyDownSaveCode,
    onKeyUpDeleteCode
}