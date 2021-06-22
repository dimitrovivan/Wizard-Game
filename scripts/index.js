import { getKeyView, keyBoardAllowedControls } from './config/controls.js';
import wizardConfig from './config/wizard.js';
import { saveKeyboardControllers, onKeyUpDeleteCode, onKeyDownSaveCode, runOnFrame } from './engine.js';
import { getDomElements, createDomElement } from './domHandler.js';
const gameScreen = getDomElements.gameScreen();
const startSection = getDomElements.startSection();
const startBtn = getDomElements.startBtn();
const allInputs = getDomElements.allInputs();

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
    saveKeyboardControllers(allInputValues);
    showWizzard();
    window.requestAnimationFrame(runOnFrame);
}

function isValidAllInputsBeforeStart(values) {
    return values.some(value => value == '') ? false : true;
}

function showWizzard() {
    let wizard = createDomElement('div', '', {'class': 'wizard'});
    wizard.style.width = `${wizardConfig.width}px`;
    wizard.style.height = `${wizardConfig.height}px`;
    wizard.style.top = `${wizardConfig.top}px`;
    wizard.style.left = `${wizardConfig.left}px`;
    gameScreen.appendChild(wizard);
}


