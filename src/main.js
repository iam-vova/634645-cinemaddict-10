import {createFilmCardTemplate} from './components/film-card.js';
import {createFilmDetailsTemplate} from './components/film-details.js';
import {createFilmsTemplate} from './components/films.js';
import {createSiteMenuTemplate} from './components/site-menu.js';
import {createLoadMoreButtonTemplate} from './components/load-more-btn.js';
import {createUserRateTemplate} from './components/user-rate.js';

const FILMS_CARDS_COUNT = 5;
const FILMS_EXTRA_CARDS_COUNT = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, createUserRateTemplate(), `beforeend`);

const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, createSiteMenuTemplate(), `beforeend`);
render(siteMainElement, createFilmsTemplate(), `beforeend`);

const filmsElement = siteMainElement.querySelector(`.films`);
const filmsListElement = filmsElement.querySelector(`.films-list`);
const filmsListWrapElement = filmsElement.querySelector(`.films-list__container`);

new Array(FILMS_CARDS_COUNT)
  .fill(``)
  .forEach(
      () => render(filmsListWrapElement, createFilmCardTemplate(), `beforeend`)
  );

render(filmsListElement, createLoadMoreButtonTemplate(), `beforeend`);

const filmsListExtraElement = filmsElement.querySelectorAll(`.films-list--extra .films-list__container`);

filmsListExtraElement.forEach((place) => {
  new Array(FILMS_EXTRA_CARDS_COUNT)
  .fill(``)
  .forEach(
      () => render(place, createFilmCardTemplate(), `beforeend`)
  );
});

render(siteMainElement, createFilmDetailsTemplate(), `beforeend`);

