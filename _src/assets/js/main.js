'use strict';

const startBtnElement = document.querySelector('.start-btn');
let inputElement;
const cardsListElement = document.querySelector('.list');

function handleSearchClick(){
  inputElement = document.querySelector('.input__form:checked');
  const queryNumber = parseInt(inputElement.value);
  const api = `https://raw.githubusercontent.com/Adalab/cards-data/master/${queryNumber}.json`;
  //console.log(queryNumber);
  fetch (api)
    .then(response => response.json())
    .then(data => {
      let searchResult = '';
      for(const item of data){
        //if(item.image){
        searchResult += `<li class="list__item"><img class="image" src="${item.image}" alt"imagen pokemon ${item.name}" width="160" height="195"></li>`;
        //} else {
          searchResult += `<li class="list__item"><img class="image" src="https://via.placeholder.com/160x195/30d9c4/ffffff/?text=ADALAB" alt"parte trasera de la carta, logo Adalab" height="195" width="160"></li>`;
       // }
      }cardsListElement.innerHTML=searchResult;
    })
}

startBtnElement.addEventListener('click', handleSearchClick);
