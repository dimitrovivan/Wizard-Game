let fireballThrowSound;

function loadSounds() {
  fireballThrowSound = new Audio('../sounds/fireballThrow.mp3');
}

export {
    fireballThrowSound,
    loadSounds
}