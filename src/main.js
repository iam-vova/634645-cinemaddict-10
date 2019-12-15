import FilmCard from './components/film-card.js';
import FilmDetails from './components/film-details.js';
import Films from './components/films.js';
import SiteMenu from './components/site-menu.js';
import LoadMoreButton from './components/load-more-btn.js';
import UserRate from './components/user-rate.js';
import Comment from "./components/comments.js";
import NoFilms from "./components/no-films.js";
import {generateFilmCards} from './mock/film-card.js';
import {render, RenderPosition} from './utils/render.js';

const FILMS_CARDS_COUNT = 15;
const FILMS_CARDS_COUNT_ON_START = 5;
const FILMS_CARDS_COUNT_BY_BUTTON = 5;
const FILMS_EXTRA_CARDS_COUNT = 2;

const renderFilm = (film, container) => {
  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replacePopup();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const replacePopup = () => {
    filmDetailsComponent.getElement().remove();
  };

  const filmComponent = new FilmCard(film);
  const filmDetailsComponent = new FilmDetails(film);
  const comments = film.comments;

  const filmActiveElements = filmComponent.getElement().querySelectorAll(`.film-card__poster, .film-card__title, .film-card__comments`);

  filmActiveElements.forEach((element) => element.addEventListener(`click`, () => {
    render(siteMainElement, filmDetailsComponent.getElement(), RenderPosition.BEFOREEND);
    const filmDetailsComments = filmDetailsComponent.getElement().querySelector(`.film-details__comments-list`);
    comments.forEach((comment) => render(filmDetailsComments, new Comment(comment).getElement(), RenderPosition.BEFOREEND));
    document.addEventListener(`keydown`, onEscKeyDown);
  }));

  const closePopupBtn = filmDetailsComponent.getElement().querySelector(`.film-details__close-btn`);
  closePopupBtn.addEventListener(`click`, () => {
    replacePopup();
  });

  render(container, filmComponent.getElement(), RenderPosition.BEFOREEND);
};

const films = generateFilmCards(FILMS_CARDS_COUNT);

const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, new UserRate(films).getElement(), RenderPosition.BEFOREEND);

const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, new SiteMenu(films).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new Films().getElement(), RenderPosition.BEFOREEND);

const filmElement = siteMainElement.querySelector(`.films`);
const filmListElement = filmElement.querySelector(`.films-list`);
const filmListWrapElement = filmElement.querySelector(`.films-list__container`);

if (films.length === 0) {
  render(filmListElement, new NoFilms().getElement(), RenderPosition.BEFOREEND);
} else {
  let showingFilmsCount = FILMS_CARDS_COUNT_ON_START;
  films.slice(0, showingFilmsCount).forEach((film) => renderFilm(film, filmListWrapElement));

  const loadMoreButton = new LoadMoreButton();
  render(filmListElement, loadMoreButton.getElement(), RenderPosition.BEFOREEND);

  loadMoreButton.getElement().addEventListener(`click`, () => {
    const prevFilmsCount = showingFilmsCount;
    showingFilmsCount = showingFilmsCount + FILMS_CARDS_COUNT_BY_BUTTON;

    films.slice(prevFilmsCount, showingFilmsCount)
      .forEach((film) => renderFilm(film, filmListWrapElement));

    if (showingFilmsCount >= films.length) {
      loadMoreButton.getElement().remove();
      loadMoreButton.removeElement();
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
  const filmsCopy = films.slice();
  for (let item of filmsListExtraElement) {
    const filmsListExtraElementWrap = item.querySelector(`.films-list__container`);
    const filmsExtraTitle = item.querySelector(`.films-list__title`).innerHTML;
    const filmsSorted = filmsSorting(filmsCopy, titleToSortKey[filmsExtraTitle]);
    filmsSorted.slice(0, FILMS_EXTRA_CARDS_COUNT).forEach((film) => renderFilm(film, filmsListExtraElementWrap));
  }
}

const footerStat = document.querySelector(`.footer .footer__statistics p`);
footerStat.innerHTML = `${films.length} movies inside`;
