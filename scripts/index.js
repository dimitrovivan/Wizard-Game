const startBtn = document.querySelector('.game-screen__start-btn');

function startGame(e) {
    e.preventDefault();
    e.target.classList.add('hide');
}
startBtn.addEventListener('click', startGame);

