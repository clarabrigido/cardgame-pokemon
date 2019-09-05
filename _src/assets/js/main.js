'use strict';
// Element
const startBtnElement = document.querySelector('.start-btn');
let inputElement;
const cardsListElement = document.querySelector('.list');
const cardBackElement = document.querySelector('.back__card');
let cards = [];
// TODO: Variable contador de clicks
const counterElement = document.querySelector('.counter');
let counter = 0;

// TODO: Variable clicks

//Timer
let n = 0;
const timerElement = document.querySelector('.timer');

// Media
const audioSelected = document.querySelector('.audio-selected');
const audioMatched = document.querySelector('.audio-matched');
const audioMissed = document.querySelector('.audio-missed');
const audioDeal = document.querySelector('.audio-deal');
const audioVictory = document.querySelector('.audio-victory');

function handleSelectCardClick(event) {
  // Incrementar el número de clicks
  counter++;
  // Actualizar el contador
  const cardElement = event.currentTarget.parentElement;
  cardElement.classList.toggle('selected');

  const selectedCardElementList = document.querySelectorAll('.selected');
  // Compara si son pareja con data-pair
  if(selectedCardElementList.length === 2) {
    const pairA = selectedCardElementList[0].getAttribute('data-pair');
    const pairB = selectedCardElementList[1].getAttribute('data-pair');

    // Si son iguales añadir clase y audio matched sino audio missed.
    if(pairA===pairB) {
      selectedCardElementList[0].classList.toggle('matched');
      selectedCardElementList[1].classList.toggle('matched');

      const cardElementList = document.querySelectorAll('.card');
      const matchedCardElementList = document.querySelectorAll('.matched');
      if(cardElementList.length === matchedCardElementList.length) {
        // Todas las parejas han sido encontradas.
        audioVictory.play();
      } else {
        // Nueva pareja encontrada.
        audioMatched.play();
      }
    } else {
      window.setTimeout(function() {
        audioMissed.play();
      }, 666);
    }
   // Tiempo de carta seleccionada boca arriba, sino hacen match.
    window.setTimeout(function() {
      selectedCardElementList[0].classList.toggle('selected');
      selectedCardElementList[1].classList.toggle('selected');
    }, 666);
    // Si se selecciona un elemento reproduce audio selected.
  } else if(selectedCardElementList.length === 1) {
    audioSelected.play();
  } else {
    console.log('Imposible!');
  }
  counterElement.innerHTML = counter;
}

function handleUnselectCardClick(event) {
  const cardElement = event.currentTarget.parentElement;
  if(cardElement.classList.contains('matched')) {
    return;
  }
  cardElement.classList.toggle('selected');
  audioSelected.play();
}

function handleRetrieveCardClick(event){

   window.setInterval(function(){
    timer.innerHTML = n;
    n++;
  },1000);

  inputElement = document.querySelector('.input__form:checked');
  const numberOfCards = parseInt(inputElement.value);
  const api = `https://raw.githubusercontent.com/Adalab/cards-data/master/${numberOfCards}.json`;
  localStorage.setItem('numberOfCards', numberOfCards);
  fetch (api)
    .then(response => response.json())
    .then(data => {
      // Baraja
      let deck = new Array(numberOfCards);
      // Posición ya Asignada?
      let assigned = new Array(numberOfCards);

      // Para cada carta ...
      for(const cardObject of data){
        // Busca hueco aleatorio libre
        while(true){
          const randomPosition = Math.floor(Math.random() * numberOfCards);
          if(assigned[randomPosition] !== true) {
            deck[randomPosition] = cardObject;
            assigned[randomPosition] = true; // Hueco asignado
            break; // Salir del bucle
          }
        }
      }

      // Preparar HTML
      let cardHTML = '';
      for(const card of deck){
        cardHTML += `<li class="list__item card" data-name="${card.name}" data-pair="${card.pair}">`;
        cardHTML += `<img class="image front" src="${card.image}" alt"Pokémon ${card.name}" width="160" height="195">`;
        cardHTML += `<img class="image back" src="https://via.placeholder.com/160x195/30d9c4/ffffff/?text=ADALAB" alt"Pokémon ?" height="195" width="160">`;
        cardHTML += `</li>`;
      }

      cardsListElement.innerHTML = cardHTML;

      audioDeal.play();

      // TODO: Reiniciar el contador de clicks
      // function handleResetCounter(event) {
      // counter = 0;
      // resetInnerHTML(counterElement);
      // }

      function resetInnerHTML(element) {
        element.innerHTML = '0';
      }

      function handleResetCounter(event) {
        counter = 0;
        resetInnerHTML(counterElement);
        startBtnElement.addEventListener('click', handleResetCounter);
      }
      const cardBackElementList = document.querySelectorAll('.card .back');
      for(const cardBackElement of cardBackElementList) {
        cardBackElement.addEventListener('click', handleSelectCardClick);
      }

      const cardFrontElementList = document.querySelectorAll('.card .front');
      for(const cardFrontElement of cardFrontElementList) {
        cardFrontElement.addEventListener('click', handleUnselectCardClick);
      }

    });
}
startBtnElement.addEventListener('click', handleRetrieveCardClick);



// Marcar la opción predeterminada
const numberOfCards = localStorage.getItem('numberOfCards');
let defaultOptionElement;
if(numberOfCards != null) {
  defaultOptionElement = document.querySelector(`#input-${numberOfCards}`);
  defaultOptionElement.setAttribute('checked', true);
}




