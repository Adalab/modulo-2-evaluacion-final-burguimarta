'use strict';
// Variables de HTML
const coctelInput = document.querySelector('.js-coctelInput');
const list = document.querySelector('.js-list');


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
        const image = drink['strDrinkThumb'];
        const id = drink ['idDrink'];

        if (image === '') {
          image = '../assets/images/cocktails.png';
        }
        //DOM basico
        list.innerHTML += `<div data-id= "${id}" class="cocktail__card js-cocktailCard">
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

      const cocktailCard = document.querySelectorAll('.js-cocktailCard');
      // Guardar en Favoritos
      let favorites = [];
      
      for (let element of cocktailCard) {
        element.addEventListener ('click', function (event) {
          event.preventDefault();
          const idCocktail = event.currentTarget.getAttribute('data-id'); //a qué coctail le doy click
      
          
      
        });
      }
    });
});
