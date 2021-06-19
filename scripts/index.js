const startBtn = document.querySelector('.game-screen__start-btn');
startBtn.addEventListener('click', onStartGame);

const keys = {};
const keyboardConfig = {
    moveForward: 'w',
    moveDown: 's',
    moveLeft: 'a',
    moveRight: 'd'
}
const validKeys = [];

function onStartGame(e) {
    e.preventDefault();
    e.target.classList.add('hide');
    saveUserKeyboardConfig();
    window.requestAnimationFrame(runOnFrame);
}

function saveUserKeyboardConfig() {
    Object.values(keyboardConfig).map(key => validKeys.push(key));
}

function IsValidKeyPressed(e) {
   return validKeys.find(validKey => e.key == validKey) ? true : false;
}

function runOnFrame(timestamp) {
    console.log(keys);
    window.requestAnimationFrame(runOnFrame);
}

function onKeyDownSaveCode(e) {
    if(IsValidKeyPressed(e)) keys[e.key] = true;
}

function onKeyUpDeleteCode(e) {
    if(IsValidKeyPressed(e)) keys[e.key] = false;
}

window.addEventListener('keydown', onKeyDownSaveCode);
window.addEventListener('keydown', onKeyUpDeleteCode);
