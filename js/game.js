const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const CardSound = new Audio('../sounds/card_sound.mp3');
const IntroSound = new Audio('../sounds/intro.mp3');

const AlienSound = new Audio('../sounds/alien.mp3');
const BoBeepSound = new Audio('../sounds/bo_peep.mp3');
const BuzzSound = new Audio('../sounds/buzz.mp3');
const CoolSound = new Audio('../sounds/cool.mp3');
const HammSound = new Audio('../sounds/hamm.mp3');
const LennySound = new Audio('../sounds/lenny.mp3');
const PizzaSound = new Audio('../sounds/pizza.mp3');
const RexSound = new Audio('../sounds/rex.mp3');
const WoodySound = new Audio('../sounds/woody.mp3');

const matchSounds = [
    AlienSound,
    BoBeepSound,
    BuzzSound,
    CoolSound,
    HammSound,
    LennySound,
    PizzaSound,
    RexSound,
    WoodySound
];

const randomMatchSound = () => {
    const randomIndex = Math.floor(Math.random() * matchSounds.length);
    const randomSound = matchSounds[randomIndex];
    randomSound.play();
};

const characters = [
    'alien',
    'babyface',
    'bo_peep',
    'buzz',
    'car',
    'ducky',
    'hamm',
    'lenny',
    'mike',
    'mr_potato',
    'rex',
    'robot',
    'rocky',
    'roly',
    'slinky_dog',
    'soldier',
    'sid',
    'troll',
    'tikes',
    'woody'
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);

    element.className = className;

    return element;
};

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if (disabledCards.length === 2) {
        clearInterval(this.loop);

        localStorage.setItem('gameTime', timer.innerHTML);

        setTimeout(() => {
            // alert(`Congratulations, ${spanPlayer.innerHTML}! Your time was ${timer.innerHTML} seconds!`);
            window.location.href = 'end.html';
        }, 3000);
    }
};

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter === secondCharacter) {
        setTimeout(() => {
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');
        firstCard = '';
        secondCard = '';
        checkEndGame();
        randomMatchSound();
        }, 1200);

    } else {
        setTimeout(() => {
        firstCard.classList.remove('reveal-card');
        secondCard.classList.remove('reveal-card');
        firstCard = '';
        secondCard = '';
        }, 1200);
    }
};

const revealCard = ({ target }) => {
    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }

    CardSound.play();

    if (firstCard === '') {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;

    } else if (secondCard === '') {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;
        checkCards();
    }
};

const createCard = (character) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    pieceCounter++;
    back.classList.add(`piece-${pieceCounter}`);

    front.style.backgroundImage = `url('../images/${character}.png')`;

    card.appendChild(front);
    card.appendChild(back);
    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character);
    return card;
};

let pieceCounter = 0;

const loadGame = () => {
    const duplicateCharacters = [ ... characters, ... characters ];
    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

    shuffledArray.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    });
};

const startTimer = () => {
    this.loop = setInterval(() => {
        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;
    }, 1000);
};

window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player');
    startTimer();
    loadGame();
    IntroSound.play();
};
