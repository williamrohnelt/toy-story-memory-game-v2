const IntroSound = new Audio('../sounds/intro.mp3');

const finalPlayerName = localStorage.getItem('player');
const finalTime = localStorage.getItem('gameTime');

// const spanPlayer = document.querySelector('.player');
// const timer = document.querySelector('.timer');

const spanResult = document.querySelector('.gameResult');
const message = `Parabéns, ${finalPlayerName}! Seu tempo foi de ${finalTime} segundos!`;

spanResult.innerHTML = message;

setTimeout(() => {
    IntroSound.play();
}, 100);
