'use strict';

const coctelInput = document.querySelector('.js-coctelInput');
const list = document.querySelector('.js_list');

document.querySelector('.js-searchbtn').addEventListener('click', function(event) {
  event.preventDefault();
  //Vaciar lista del HTML
  list.innerHTML = "";

  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${coctelInput.value}`)
    .then((response) => response.json())
    .then((data) => {
      
      for (var drink of data.drinks)
      {
        console.log(drink['strDrink']);

        //DOM basico
        list.innerHTML += `<div class="card">
        <h3>${drink['strDrink']}</h3>
        <div class="container__image">
          <img src="${}">
        </div>
      </div>`;

        // //DOM avanzado
        // const drinkLi = document.createElement('li');
        // const textLi = document.createTextNode(drink['strDrink']);
        // drinkLi.appendChild(textLi);

        // list.appendChild(drinkLi);
      }
    });
});
