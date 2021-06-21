function runOnFrame(timestamp) {
    console.log(timestamp);
    window.requestAnimationFrame(runOnFrame);
}

export {
    runOnFrame
}