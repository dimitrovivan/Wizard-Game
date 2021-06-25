let fireballThrowSound;
let punchSound;
let killWitchSound;

function loadSounds() {
  fireballThrowSound = new Audio('../sounds/fireballThrow.mp3');
  punchSound = new Audio('../sounds/punchSound.mp3');
  killWitchSound = new Audio('../sounds/killWitch.mp3');
}

export {
    fireballThrowSound,
    killWitchSound,
    punchSound,
    loadSounds
}