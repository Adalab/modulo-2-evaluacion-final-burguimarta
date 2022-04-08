'use strict';

const coctelInput = document.querySelector('.js-coctelInput');
const list = document.querySelector('.js_list');

document.querySelector('.js-searchbtn').addEventListener('click', function(event) {
  event.preventDefault();
  //Vaciar lista del HTML
  list.innerHTML = '';
  // Interpolada variable con el value del Input

  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${coctelInput.value}`)
    .then((response) => response.json())
    .then((data) => {
      for (let drink of data.drinks) {
        const drinkName = drink['strDrink'];
        let image = drink['strDrinkThumb'];

        if (image === '') {
          image = 'https://via.placeholder.com/150';
        }
        //DOM basico
        list.innerHTML += `<div class="cocktail__card">
          <h3 class="cocktail__name">${drinkName}</h3>
          <div>
          <img class="cocktail__image" src="${image}">
          </div>`;

        // //DOM avanzado
        // const drinkLi = document.createElement('li');
        // const textLi = document.createTextNode(drink['strDrink']);
        // drinkLi.appendChild(textLi);

        // list.appendChild(drinkLi);
      }
    });
});
