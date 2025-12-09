const MissionSound = new Audio('../sounds/mission.mp3');

const finalPlayerName = localStorage.getItem('player');
const finalTime = localStorage.getItem('gameTime');

// const spanPlayer = document.querySelector('.player');
// const timer = document.querySelector('.timer');

const spanResult = document.querySelector('.gameResult');
const message = `Parabéns, ${finalPlayerName}! Seu tempo foi de ${finalTime} segundos!`;

spanResult.innerHTML = message;

setTimeout(() => {
    MissionSound.play();
}, 300);
