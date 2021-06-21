const keys = {};
const userGameControllers = [];

function runOnFrame(timestamp) {
    console.log(timestamp);
    window.requestAnimationFrame(runOnFrame);
}

function IsValidKeyPressed(e) {
    return userGameControllers.find(controller => e.key == controller) ? true : false;
 }
 
 function onKeyDownSaveCode(e) {
     console.log(userGameControllers);
     if(IsValidKeyPressed(e)) keys[e.key] = true;
 }
 
 function onKeyUpDeleteCode(e) {
     if(IsValidKeyPressed(e)) keys[e.key] = false;
 }

 function saveKeyboardControllers(keyboardControls) {
    keyboardControls.map(controller => userGameControllers.push(controller));
 }

export {
    runOnFrame,
    saveKeyboardControllers,
    onKeyDownSaveCode,
    onKeyUpDeleteCode
}