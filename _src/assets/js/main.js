'use strict';

const startBtnElement = document.querySelector('.start-btn');
let inputElement;
const cardsListElement = document.querySelector('.list');
const cardBackElement = document.querySelector('.back__card');
let cards = [];

// const audioClick = new Audio ('assets/media/click.mp3');
// const audioPush = new Audio ('assets/media/push.mp3');
// const audioError = new Audio ('assets/media/error.mp3');

// let audios = function (type) {
//     type.currentTime = 0;
//     type.play();
// };



function handleCardClick(event) {
  const cardElement = event.currentTarget.parentElement;
  cardElement.classList.toggle('selected');

  const selectedCardElementList = document.querySelectorAll('.selected');
  if(selectedCardElementList.length === 2) {

    const pairA = selectedCardElementList[0].getAttribute('data-pair');
    const pairB = selectedCardElementList[1].getAttribute('data-pair');

    if(pairA===pairB) {
      selectedCardElementList[0].classList.toggle('matched');
      selectedCardElementList[1].classList.toggle('matched');
    }

    window.setTimeout(function() {
      selectedCardElementList[0].classList.toggle('selected');
      selectedCardElementList[1].classList.toggle('selected');
    }, 555);

  } else if(selectedCardElementList.length === 1) {
    // DO NOTHING!
  } else {
    console.log('Imposible!');
  }
}

function handleSearchCardClick(event){
  inputElement = document.querySelector('.input__form:checked');
  const queryNumber = parseInt(inputElement.value);
  const api = `https://raw.githubusercontent.com/Adalab/cards-data/master/${queryNumber}.json`;
  //console.log(queryNumber);
  fetch (api)
    .then(response => response.json())
    .then(data => {
      let searchResult = '';
      let cardHTML = '';
      for(const card of data){
        cardHTML += `<li class="list__item card" data-name="${card.name}" data-pair="${card.pair}">`;
        cardHTML += `<img class="image front" src="${card.image}" alt"Pokémon ${card.name}" width="160" height="195">`;
        cardHTML += `<img class="image back" src="https://via.placeholder.com/160x195/30d9c4/ffffff/?text=ADALAB" alt"Pokémon ?" height="195" width="160">`;
        cardHTML += `</li>`;
        //searchResult += `<li class="list__item front-card" data-name="${card.name} data-pair="${card.pair}"><img class="image" src="${card.image}" alt"imagen pokemon ${card.name}" width="160" height="195"></li>`;
        //searchResult += `<li class="list__item back-card" ><img class="image" src="https://via.placeholder.com/160x195/30d9c4/ffffff/?text=ADALAB" alt"parte trasera de la carta, logo Adalab" height="195" width="160"></li>`;
      }
      cardsListElement.innerHTML=cardHTML;

      const cardElementList = document.querySelectorAll('.card .back');
      for(const cardElement of cardElementList) {
        cardElement.addEventListener('click', handleCardClick);
      }

    });
}

startBtnElement.addEventListener('click', handleSearchCardClick);
