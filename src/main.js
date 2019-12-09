import {createFilmCardTemplate} from './components/film-card.js';
import {createFilmDetailsTemplate} from './components/film-details.js';
import {createFilmsTemplate} from './components/films.js';
import {createSiteMenuTemplate} from './components/site-menu.js';
import {createLoadMoreButtonTemplate} from './components/load-more-btn.js';
import {createUserRateTemplate} from './components/user-rate.js';
import {generateFilmCards} from './mock/film-card.js';

const FILMS_CARDS_COUNT = 15;
const FILMS_CARDS_COUNT_ON_START = 5;
const FILMS_CARDS_COUNT_BY_BUTTON = 5;
const FILMS_EXTRA_CARDS_COUNT = 2;

const films = generateFilmCards(FILMS_CARDS_COUNT);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, createUserRateTemplate(films), `beforeend`);

const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, createSiteMenuTemplate(films), `beforeend`);
render(siteMainElement, createFilmsTemplate(), `beforeend`);

const filmElement = siteMainElement.querySelector(`.films`);
const filmListElement = filmElement.querySelector(`.films-list`);
const filmListWrapElement = filmElement.querySelector(`.films-list__container`);

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

const filmsSorting = (filmsArr, key) => {
  return filmsArr.sort((a, b) => b[key] - a[key]);
};

const titleToSortKey = {
  "Top rated": `rate`,
  "Most commented": `commentsCont`,
};

const filmsListExtraElement = filmElement.querySelectorAll(`.films-list--extra`);
for (let item of filmsListExtraElement) {
  const filmsListExtraElementWrap = item.querySelector(`.films-list__container`);
  const filmsExtraTitle = item.querySelector(`.films-list__title`).innerHTML;
  const filmsSorted = filmsSorting(films, titleToSortKey[filmsExtraTitle]);
  filmsSorted.slice(0, FILMS_EXTRA_CARDS_COUNT).forEach((film) => render(filmsListExtraElementWrap, createFilmCardTemplate(film), `beforeend`));
}

render(siteMainElement, createFilmDetailsTemplate(films[0]), `beforeend`);

const filmDetailsElement = siteMainElement.querySelector(`.film-details`);
const filmDetailsCloseBtn = filmDetailsElement.querySelector(`.film-details__close-btn`);

filmDetailsCloseBtn.addEventListener(`click`, () => {
  filmDetailsElement.remove();
});
