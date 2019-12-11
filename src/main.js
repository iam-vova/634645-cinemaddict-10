import FilmCard from './components/film-card.js';
import {createFilmDetailsTemplate} from './components/film-details.js';
import Films from './components/films.js';
import SiteMenu from './components/site-menu.js';
import {createLoadMoreButtonTemplate} from './components/load-more-btn.js';
import UserRate from './components/user-rate.js';
import {generateFilmCards} from './mock/film-card.js';
import {render, RenderPosition} from './utils.js';

const FILMS_CARDS_COUNT = 15;
const FILMS_CARDS_COUNT_ON_START = 5;
const FILMS_CARDS_COUNT_BY_BUTTON = 5;
const FILMS_EXTRA_CARDS_COUNT = 2;

const films = generateFilmCards(FILMS_CARDS_COUNT);

const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, new UserRate(films).getElement(), RenderPosition.BEFOREEND);

const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, new SiteMenu(films).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new Films().getElement(), RenderPosition.BEFOREEND);

const filmElement = siteMainElement.querySelector(`.films`);
const filmListElement = filmElement.querySelector(`.films-list`);
const filmListWrapElement = filmElement.querySelector(`.films-list__container`);

let showingFilmsCount = FILMS_CARDS_COUNT_ON_START;
films.slice(0, showingFilmsCount).forEach((film) => render(filmListWrapElement, new FilmCard(film).getElement(), RenderPosition.BEFOREEND));

render(filmListElement, createLoadMoreButtonTemplate(), RenderPosition.BEFOREEND);

const loadMoreButton = filmListElement.querySelector(`.films-list__show-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevFilmsCount = showingFilmsCount;
  showingFilmsCount = showingFilmsCount + FILMS_CARDS_COUNT_BY_BUTTON;

  films.slice(prevFilmsCount, showingFilmsCount)
    .forEach((film) => render(filmListWrapElement, new FilmCard(film).getElement(), RenderPosition.BEFOREEND));

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
  filmsSorted.slice(0, FILMS_EXTRA_CARDS_COUNT).forEach((film) => render(filmsListExtraElementWrap, new FilmCard(film).getElement(), RenderPosition.BEFOREEND));
}

render(siteMainElement, createFilmDetailsTemplate(films[0]), RenderPosition.BEFOREEND);

const filmDetailsElement = siteMainElement.querySelector(`.film-details`);
const filmDetailsCloseBtn = filmDetailsElement.querySelector(`.film-details__close-btn`);

filmDetailsCloseBtn.addEventListener(`click`, () => {
  filmDetailsElement.remove();
});

const footerStat = document.querySelector(`.footer .footer__statistics p`);
footerStat.innerHTML = `${films.length} movies inside`;
