const startSection = document.querySelector('.start-section');
const startBtn = document.querySelector('.start-section__btn');
startBtn.addEventListener('click', onStartGame);

window.addEventListener('keydown', onKeyDownSaveCode);
window.addEventListener('keydown', onKeyUpDeleteCode);

function onStartGame(e) {
    e.preventDefault();
    startSection.classList.add('hide');
    saveUserKeyboardConfig();
    window.requestAnimationFrame(runOnFrame);
}

function runOnFrame(timestamp) {
    window.requestAnimationFrame(runOnFrame);
}

const keys = {};

const validKeys = [];

const keyboardConfig = {
    moveForward: 'w',
    moveDown: 's',
    moveLeft: 'a',
    moveRight: 'd'
}

function saveUserKeyboardConfig() {
    Object.values(keyboardConfig).map(key => validKeys.push(key));
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


