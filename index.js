import { createCharacterCard } from "./components/card/card.js";

/* const characterCard = createCharacterCard; */

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
//Why does this still work? look at  / *  * / navigation is not used?!
/* const navigation = document.querySelector('[data-js="navigation"]'); */
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let maxPage = 1;
let page = 1;
let searchQuery = "";

async function fetchCharacters() {
  let url = `https://rickandmortyapi.com/api/character/?page=${page}`;
  if (searchQuery) {
    url += `&name=${encodeURIComponent(searchQuery)}`;
  }
  const response = await fetch(url);

  const data = await response.json();
  cardContainer.innerHTML = "";
  data.results.forEach((character) => {
    createCharacterCard(character);
  });
  maxPage = data.info.pages;
  pagination.textContent = `${page} / ${maxPage}`;
}

fetchCharacters();

nextButton.addEventListener("click", () => {
  if (page < maxPage) {
    page++;
    fetchCharacters();
  }
});

prevButton.addEventListener("click", () => {
  if (page > 1) {
    page--;
    fetchCharacters();
  }
});

searchBarContainer.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchQuery = searchBar.querySelector(".search-bar__input").value;
  fetchCharacters();
});
