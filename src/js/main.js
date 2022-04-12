'use strict';

// Variables de HTML
const coctelInput = document.querySelector('.js-coctelInput');
const cocktails = document.querySelector('.js-cocktail');
const cocktailsFav =document.querySelector('.js-CocktailFav');
const resetBtn =document.querySelector ('.js-resetbtn');

// Variables globales
let favorites = [];
// Añado los cócteles del LocalStorage al array
if (localStorage.getItem('favorites') !== null) {
  favorites = JSON.parse(localStorage.getItem('favorites'));

  for (let id of favorites) {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response2) => response2.json())
      .then((data2) => {
        addCocktailFav(data2.drinks[0]['idDrink'], data2.drinks[0]['strDrink'], data2.drinks[0]['strDrinkThumb']);
      });
  }
} else {
  favorites = [];
}
// Pinto en HTML la tarjeta de favoritos
function addCocktailFav(id, name, image) {
  cocktailsFav.innerHTML += `<div class="cocktailFav__card" data-id="${id}">
    <h3 class="cocktailFav__name">${name}</h3>
    <img class="cocktailFav__icon" src="./assets/images/cactus_favorite.svg">
    <img class="cocktailFav__image" src="${image}">
    </div>`;
}
//Quito el favorito
function removeCocktailFav(id) {
  for (let child of cocktailsFav.children) {
    const idChild = child.getAttribute('data-id');
    if (idChild === id) {
      child.remove ();
    }
  }
}

// Añado los cócteles de la búsqueda al HTML
function addCocktails(drinks) {
  for (let drink of drinks) {
    const drinkName = drink['strDrink'];
    let image = drink['strDrinkThumb'];
    const idDrink = drink['idDrink'];
    const drinkFav = favorites.indexOf(idDrink) !== -1; //Busca si el valor idDrink está dentro del array, si es así devuelve la posición, sino, devuelve -1. Operación lógica para convertirlo en booleano.
    let classFav = '';
    // let classFav = drinkFav ? 'cocktail__card--fav' : ''; Condicional ternario, en el que si drinkFav es verdadero devuelve la clase, si es falso devuelve vacío.

    // Igual que el condicional ternario pero en versión mejorada -> en el que si drinkFav es verdadero devuelve la clase, si es falso devuelve vacío.
    if (drinkFav) {
      classFav = 'cocktail__card--fav';
    }else {
      classFav = '';
    }

    if (image === '') {
      image = '../images/cocktails.png';
    }

    //DOM basico
    cocktails.innerHTML += `<div data-image="${image}" data-name="${drinkName}" data-id="${idDrink}" data-fav="${drinkFav}" class="cocktail__card js-cocktailCard ${classFav}">
      <h3 class="cocktail__name">${drinkName}</h3>
      <img class="cocktail__image" src="${image}">
      </div>`;

    // //DOM avanzado
    // const drinkLi = document.createElement('li');
    // const textLi = document.createTextNode(drink['strDrink']);
    // drinkLi.appendChild(textLi);

    // list.appendChild(drinkLi);
  }
}
// Añado los Eventos a cada uno de los cócteles de la búsqueda
function addEventCocktails() {
  const cocktailCards = document.querySelectorAll('.js-cocktailCard');
  // Guardar en Favoritos
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
        addCocktailFav(id, name, image);
      } else {
        const position = favorites.indexOf(id);
        favorites.splice(position, 1);
        element.classList.remove('cocktail__card--fav');
        event.currentTarget.setAttribute('data-fav', 'false');
        removeCocktailFav(id);
      }
      // Guardar en LocalStorage
      localStorage.setItem('favorites', JSON.stringify(favorites));
    });
  }
}
// Escucho el botón de buscar
document.querySelector('.js-searchbtn').addEventListener('click', function(event) {
  event.preventDefault();

  //Vaciar lista del HTML
  cocktails.innerHTML = '';

  // Interpolada variable con el value del Input
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${coctelInput.value}`)
    .then((response) => response.json())
    .then((data) => {
      addCocktails(data.drinks);
      addEventCocktails();
    });
});

// Función de reset
resetBtn.addEventListener('click', function(event) {
  event.preventDefault();
  favorites = [];
  localStorage.removeItem('favorites');
  cocktailsFav.innerHTML = '';
  location.reload();
});


// Botón Burbuja
const animateButton = function(e) {

  e.preventDefault;
  //reset animation
  e.target.classList.remove('animate');
  e.target.classList.add('animate');
  setTimeout(function(){
    e.target.classList.remove('animate');
  },700);
};

const bubblyButtons = document.getElementsByClassName('bubbly-button');

for (let i = 0; i < bubblyButtons.length; i++) {
  bubblyButtons[i].addEventListener('click', animateButton, false);
}