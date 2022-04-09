'use strict';

// Variables de HTML
const coctelInput = document.querySelector('.js-coctelInput');
const cocktails = document.querySelector('.js-cocktail');


document.querySelector('.js-searchbtn').addEventListener('click', function(event) {
  event.preventDefault();

  //Vaciar lista del HTML
  cocktails.innerHTML = '';
 
  // Interpolada variable con el value del Input
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${coctelInput.value}`)
    .then((response) => response.json())
    .then((data) => {
      for (let drink of data.drinks) {
        const drinkName = drink['strDrink'];
        const image = drink['strDrinkThumb'];
        const idDrink = drink ['idDrink'];

        if (image === '') {
          image = '../assets/images/cocktails.png';
        }
        //DOM basico
        cocktails.innerHTML += `<div data-image="${image}" data-name="${drinkName}" data-id="${idDrink}" data-fav="false" class="cocktail__card js-cocktailCard">
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

      const cocktailCards = document.querySelectorAll('.js-cocktailCard');
      // Guardar en Favoritos
      let favorites = [];
      for (let element of cocktailCards) {
        element.addEventListener ('click', function (event) {
          event.preventDefault();

          const id = event.currentTarget.getAttribute('data-id'); //a qué cocktail le doy click
          const name = event.currentTarget.getAttribute('data-name'); //coger el nombre
          const image = event.currentTarget.getAttribute('data-image'); //coger la imagen
          const fav = (event.currentTarget.getAttribute('data-fav') === 'true'); // booleano que me dice si es favorito
          // console.log (id + " " + name + " " + image + " " + fav + " "); --> Forma antigua de concatenar
          // condición para pintar con color y despintar los favoritos
          if (!fav) {
            favorites.push(id);
            element.classList.add('cocktail__card--fav');
            event.currentTarget.setAttribute('data-fav', 'true');
          } else {
            const position = favorites.indexOf(id);
            favorites.splice(position, 1);
            element.classList.remove('cocktail__card--fav');
            event.currentTarget.setAttribute('data-fav', 'false');
          }

          console.log(favorites);
        });
      }
    });
// Guardar en LocalStorage

});
