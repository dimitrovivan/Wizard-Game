let fireballThrowSound;
let punchSound;
let killWitchSound;

function loadSounds() {
  fireballThrowSound = new Audio('./scripts/sounds/fireballThrow.mp3');
  punchSound = new Audio('./scripts/sounds/punchSound.mp3');
  killWitchSound = new Audio('./scripts/sounds/killWitch.mp3');
}

export {
    fireballThrowSound,
    killWitchSound,
    punchSound,
    loadSounds
}