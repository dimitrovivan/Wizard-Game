const startSection = document.querySelector('.start-section');
const allInputs = Array.from(document.querySelectorAll('.start-section input'));
startSection.addEventListener('click', onClearInputValue);
startSection.addEventListener('keydown', onAddKeyBoardValue)

const startBtn = document.querySelector('.start-section__btn');
startBtn.addEventListener('click', onStartGame);

const keys = {};
const validKeys = [];
const keyBoardConfigValidKeys = [
                                 '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                                 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'i', 'j', 'k',
                                 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's','t', 'u', 
                                 'v', 'w', 'x', 'y', 'z', 'h', ' ', 'arrowup', 'arrowdown',
                                 'arrowleft', 'arrowright'
                                ];

function addKeyView(key) {
    let keyView;

    switch(key) {
        case 'arrowup': keyView = '\u2191'; break;
        case 'arrowdown': keyView = '\u2193'; break;
        case 'arrowleft': keyView = '\u2190'; break;
        case 'arrowright': keyView = '\u2192'; break;
        case ' ': keyView = 'space'; break;
        default: keyView = key;
    }

    return keyView;
}

window.addEventListener('keydown', onKeyDownSaveCode);
window.addEventListener('keyup', onKeyUpDeleteCode);

function onStartGame(e) {
    e.preventDefault();
    startSection.classList.add('hide');
    window.requestAnimationFrame(runOnFrame);
}

function runOnFrame(timestamp) {
    window.requestAnimationFrame(runOnFrame);
}

function onClearInputValue(e) {
    if(e.target.tagName == 'INPUT') e.target.value = '';
    else return;
}

function isInputAlreadyTook(e) {
    return allInputs.find(input => input.value == addKeyView(e.key.toLowerCase())) ? true : false;
}

function onAddKeyBoardValue(e) {
    let isShiftKeyPressed = e.shiftKey;
    switch(true) {
        case isShiftKeyPressed == true:
        case isInputAlreadyTook(e) == true:
        case !keyBoardConfigValidKeys.find(validKey => validKey == e.key.toLowerCase()) == true: {
             e.preventDefault();
             break;
        }
        default: e.target.value = addKeyView(e.key.toLowerCase());
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
