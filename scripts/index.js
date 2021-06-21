import { getKeyView, keyBoardAllowedControls } from './config/controls.js';
import { runOnFrame } from './config/engine.js';

const startSection = document.querySelector('.start-section');
const startBtn = document.querySelector('.start-section__btn');
const allInputs = Array.from(document.querySelectorAll('.start-section input'));
const keys = {};
const validKeys = [];

window.addEventListener('keyup', onKeyUpDeleteCode);
window.addEventListener('keydown', onKeyDownSaveCode);
startSection.addEventListener('click', onClearInputValue);
startSection.addEventListener('keydown', onAddKeyBoardValue)
startBtn.addEventListener('click', onStartGame);

function onStartGame(e) {
    e.preventDefault();
    startSection.classList.add('hide');
    saveKeyboardControllers();
    window.requestAnimationFrame(runOnFrame);
}

function onClearInputValue(e) {
    if(e.target.tagName == 'INPUT') e.target.value = '';
}

function isInputAlreadyTook(e) {
    return allInputs.find(input => input.value == getKeyView(e.key.toLowerCase())) ? true : false;
}

function saveKeyboardControllers() {
    allInputs.map(input => validKeys.push(input.value));
 }

function onAddKeyBoardValue(e) {
    let isShiftKeyPressed = e.shiftKey;
    switch(true) {
        case isShiftKeyPressed == true:
        case isInputAlreadyTook(e) == true:
        case !keyBoardAllowedControls.find(validKey => validKey == e.key.toLowerCase()) == true: {
             e.preventDefault();
             break;
        }
        default: e.target.value = getKeyView(e.key.toLowerCase());
    }
}

function IsValidKeyPressed(e) {
    return validKeys.find(validKey => e.key == validKey) ? true : false;
 }
 
 function onKeyDownSaveCode(e) {
     if(IsValidKeyPressed(e)) keys[e.key] = true;
 }
 
 function onKeyUpDeleteCode(e) {
     if(IsValidKeyPressed(e)) keys[e.key] = false;
 }