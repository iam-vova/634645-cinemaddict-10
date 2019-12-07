import {createFilmCardTemplate} from './components/film-card.js';
import {createFilmDetailsTemplate} from './components/film-details.js';
import {createFilmsTemplate} from './components/films.js';
import {createSiteMenuTemplate} from './components/site-menu.js';
import {createLoadMoreButtonTemplate} from './components/load-more-btn.js';
import {createUserRateTemplate} from './components/user-rate.js';
import {generateFilmCards} from './mock/film-card.js';
import {arrayShuffle} from './utils.js';


const FILMS_CARDS_COUNT = 15;
const FILMS_CARDS_COUNT_ON_START = 5;
const FILMS_CARDS_COUNT_BY_BUTTON = 5;
const FILMS_EXTRA_CARDS_COUNT = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, createUserRateTemplate(), `beforeend`);

const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, createSiteMenuTemplate(), `beforeend`);
render(siteMainElement, createFilmsTemplate(), `beforeend`);

const filmElement = siteMainElement.querySelector(`.films`);
const filmListElement = filmElement.querySelector(`.films-list`);
const filmListWrapElement = filmElement.querySelector(`.films-list__container`);

const films = generateFilmCards(FILMS_CARDS_COUNT);

let showingFilmsCount = FILMS_CARDS_COUNT_ON_START;
films.slice(0, showingFilmsCount).forEach((film) => render(filmListWrapElement, createFilmCardTemplate(film), `beforeend`));

render(filmListElement, createLoadMoreButtonTemplate(), `beforeend`);

const loadMoreButton = filmListElement.querySelector(`.films-list__show-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevFilmsCount = showingFilmsCount;
  showingFilmsCount = showingFilmsCount + FILMS_CARDS_COUNT_BY_BUTTON;

  films.slice(prevFilmsCount, showingFilmsCount)
    .forEach((film) => render(filmListWrapElement, createFilmCardTemplate(film), `beforeend`));

  if (showingFilmsCount >= films.length) {
    loadMoreButton.remove();
  }
});

const filmsListExtraElement = filmElement.querySelectorAll(`.films-list--extra .films-list__container`);

filmsListExtraElement.forEach((place) => {
  const filmsExtra = arrayShuffle(films);
  filmsExtra.slice(0, FILMS_EXTRA_CARDS_COUNT).forEach((film) => render(place, createFilmCardTemplate(film), `beforeend`));
});

render(siteMainElement, createFilmDetailsTemplate(), `beforeend`);

