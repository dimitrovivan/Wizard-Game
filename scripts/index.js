import { getKeyView, keyBoardAllowedControls, saveKeyboardControllers } from './config/controls.js';
import { getDomElements } from './domHandler.js';
import { showWizard } from './actions/wizard.js';
import { onKeyDownSaveCode, onKeyUpDeleteCode } from './actions/controls.js';
import { runGame } from './engine.js';

const startSection = getDomElements.startSection();
const startBtn = getDomElements.startBtn();
const allInputs = getDomElements.allInputs();
const healthSection = getDomElements.healthSection();
const logo = getDomElements.logo();
const scoreSection = getDomElements.scoreSection();

startSection.addEventListener('click', onClearInputValue);
startSection.addEventListener('keydown', onAddKeyBoardValue)
startBtn.addEventListener('click', onStartGame);

function onClearInputValue(e) {
    if (e.target.tagName == 'INPUT') e.target.value = '';
}

function isInputAlreadyTook(e) {
    return allInputs.find(input => input.value == getKeyView(e.key.toLowerCase())) ? true : false;
}

function onAddKeyBoardValue(e) {
    let isShiftKeyPressed = e.shiftKey;
    switch (true) {
        case isShiftKeyPressed == true:
        case isInputAlreadyTook(e) == true:
        case !keyBoardAllowedControls.find(validKey => validKey == e.key.toLowerCase()) == true: {
            e.preventDefault();
            break;
        }
        default: e.target.value = getKeyView(e.key.toLowerCase());
    }
}

function onStartGame(e) {
    e.preventDefault();

    const allInputValues = allInputs.reduce((acc, curr) => {
        acc.push(curr.value);
        return acc;
    }, []);

    if (!isValidAllInputsBeforeStart(allInputValues)) return;

    window.addEventListener('keyup', onKeyUpDeleteCode);
    window.addEventListener('keydown', onKeyDownSaveCode);

    startSection.classList.add('hide');
    logo.classList.add('hide');
    healthSection.classList.add('appear');
    scoreSection.classList.add('appear');
    saveKeyboardControllers(allInputValues);
    showWizard();
    window.requestAnimationFrame(runGame);
}

function isValidAllInputsBeforeStart(values) {
    return values.some(value => value == '') ? false : true;
}

