const startSection = document.querySelector('.start-section');
startSection.addEventListener('click', onClearInputValue);

const startBtn = document.querySelector('.start-section__btn');
startBtn.addEventListener('click', onStartGame);

const keys = {};
const validKeys = [];

window.addEventListener('keydown', onKeyDownSaveCode);
window.addEventListener('keydown', onKeyUpDeleteCode);

function onStartGame(e) {
    e.preventDefault();
    startSection.classList.add('hide');
    window.requestAnimationFrame(runOnFrame);
}

function runOnFrame(timestamp) {
    window.requestAnimationFrame(runOnFrame);
}

function onClearInputValue(e) {
    if(e.target.tagName == "INPUT") e.target.value = "";
    else return;
    
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
