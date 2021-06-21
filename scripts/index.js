import { getKeyView, keyBoardAllowedControls } from './config/controls.js';
import { saveKeyboardControllers, onKeyUpDeleteCode, onKeyDownSaveCode, runOnFrame } from './engine.js';

const startSection = document.querySelector('.start-section');
const startBtn = document.querySelector('.start-section__btn');
const allInputs = Array.from(document.querySelectorAll('.start-section input'));

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
    window.requestAnimationFrame(runOnFrame);
}

function isValidAllInputsBeforeStart(values) {
    return values.some(value => value == '') ? false : true;
}
