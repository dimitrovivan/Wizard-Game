let fireballThrowSound;
let punchSound;

function loadSounds() {
  fireballThrowSound = new Audio('../sounds/fireballThrow.mp3');
  punchSound = new Audio('../sounds/punchSound.mp3');
}

export {
    fireballThrowSound,
    punchSound,
    loadSounds
}