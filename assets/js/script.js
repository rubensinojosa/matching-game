import { getData } from "./data.js";
import { winnerModal } from "./modal.js";

const cardContainer = document.querySelector('.main-bottom-content');
const playerLivesCount = document.querySelector('h2 span');
let select = document.querySelector('select');
let playerLives = 25;       // default (easy)

playerLivesCount.textContent = playerLives;


// Verifica se há mudança da dificuldade
const changeDifficult = () => {
    select.addEventListener('change', () => {

        let optionValue = select.options[select.selectedIndex];   
        let value = optionValue.value;
    
        value === 'easy' ? playerLives = 25 : playerLives = 15;
    
        playerLivesCount.textContent = playerLives;
    });
}

changeDifficult();


// Randomizar os dados dos cards
const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() - 0.5);

    return cardData;
}


// Gerar o HTML dos cards
const cardGenerator = () => {
    const cardData = randomize();

    cardData.forEach(item => {
        const card = document.createElement('div');
        const front = document.createElement('img');
        const back = document.createElement('div');
        const backImg = document.createElement('img')

        card.classList.add('card');
        front.classList.add('card-front');
        back.classList.add('card-back');

        card.setAttribute('name', item.name);
        front.src = item.imgSrc;
        front.alt = item.name;

        backImg.src = 'assets/images/reveal.png';

        cardContainer.appendChild(card);
        card.appendChild(front);
        card.appendChild(back);
        back.appendChild(backImg);

        card.addEventListener('click', (e) => {
            card.classList.toggle('toggle-card');
            checkCards(e);
        });
    });
};


// Checar os cards virados
const checkCards = (e) => {
    const clickedCard = e.target;
    clickedCard.classList.add('flipped');
    const flippedCard = document.querySelectorAll('.flipped');
    const toggleCard = document.querySelectorAll('.toggle-card');


    if (flippedCard.length === 2) {
        if (flippedCard[0].getAttribute('name') === flippedCard[1].getAttribute('name')) {
            flippedCard.forEach(card => {
                card.classList.remove('flipped');
                card.style.pointerEvents = 'none';
            })
        }
        else {
            flippedCard.forEach(card => {
                card.classList.remove('flipped');

                // Delay de 1 segundo para dar tempo de visualizar as duas cartas antes de virarem 
                setTimeout(() => card.classList.remove('toggle-card'), 1000);
            });

            playerLives--;
            playerLivesCount.textContent = playerLives;

            if (playerLives === 0) {
                restart('😢 Você perdeu! Tente novamente.');
                setTimeout(() =>  document.location.reload(true), 1500);
            }
        }
    }

    // Verifica se o jogador venceu o jogo
    if (toggleCard.length === 18) {
        winnerModal('modal-winner');
    }
}


// Restart quando acabam as tentativas
const restart = (text) => {
    let cardData = randomize();
    let fronts = document.querySelectorAll('.card-front');
    let cards = document.querySelectorAll('.card');


    cardData.forEach((item, index) => {
        cards[index].classList.remove('toggle-card');

        setTimeout(() => {
            cards[index].style.pointerEvents = 'all';
            cards[index].setAttribute('name', item.name);
            fronts[index].src = item.imgSrc;
        }, 1000)
    });

    setTimeout(() => window.alert(text), 1000);
}

cardGenerator();
