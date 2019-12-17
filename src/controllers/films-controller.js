import FilmCard from '../components/film-card.js';
import FilmDetails from '../components/film-details.js';
import FilmsExtra from '../components/films-extra.js';
import NoFilms from '../components/no-films.js';
import SortComponent, {SortType} from '../components/sort.js';
import LoadMoreButton from '../components/load-more-btn.js';
import Comment from '../components/comments.js';
import {render, remove, RenderPosition} from '../utils/render.js';

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
    remove(filmDetailsComponent);
  };

  const siteMainElement = document.querySelector(`.main`);
  const filmComponent = new FilmCard(film);
  const filmDetailsComponent = new FilmDetails(film);
  const comments = film.comments;

  filmComponent.setFilmCardClickHandler(() => {
    render(siteMainElement, filmDetailsComponent, RenderPosition.BEFOREEND);
    const filmDetailsComments = filmDetailsComponent.getElement().querySelector(`.film-details__comments-list`);
    comments.forEach((comment) => render(filmDetailsComments, new Comment(comment), RenderPosition.BEFOREEND));

    document.addEventListener(`keydown`, onEscKeyDown);
    filmDetailsComponent.setFilmDetailsCloseHandler(() => {
      replacePopup();
    });
  });

  render(container, filmComponent, RenderPosition.BEFOREEND);
};

const renderFilms = (films, container) => {
  films.forEach((film) => renderFilm(film, container));
};

export default class FilmsController {
  constructor(container) {
    this._container = container;

    this._noFilmsComponent = new NoFilms();
    this._sortComponent = new SortComponent();
    this._loadMoreButtonComponent = new LoadMoreButton();
  }

  render(films) {
    const renderLoadMoreButton = () => {
      if (showingFilmsCount >= filmsRelevant.length) {
        remove(this._loadMoreButtonComponent);
      }

      render(filmListElement, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);

      this._loadMoreButtonComponent.setClickHandler(() => {
        const prevFilmsCount = showingFilmsCount;
        showingFilmsCount = showingFilmsCount + FILMS_CARDS_COUNT_BY_BUTTON;

        renderFilms(filmsRelevant.slice(prevFilmsCount, showingFilmsCount), filmListWrapElement);

        if (showingFilmsCount >= filmsRelevant.length) {
          remove(this._loadMoreButtonComponent);
        }
      });
    };

    let filmsRelevant = films.slice();

    const container = this._container.getElement();
    const filmListElement = this._container.getElement().querySelector(`.films-list`);
    const filmListWrapElement = this._container.getElement().querySelector(`.films-list__container`);

    if (filmsRelevant.length === 0) {
      render(filmListWrapElement, this._noFilmsComponent, RenderPosition.BEFOREEND);
      return;
    }

    let showingFilmsCount = FILMS_CARDS_COUNT_ON_START;

    render(container, this._sortComponent, RenderPosition.BEFORE);
    renderFilms(filmsRelevant.slice(0, showingFilmsCount), filmListWrapElement);
    renderLoadMoreButton();

    const filmsSorting = (filmsArr, key) => {
      return filmsArr.sort((a, b) => b[key] - a[key]);
    };

    const titleToSortKey = {
      "Top rated": `rate`,
      "Most commented": `commentsCont`,
    };
    const extraTitles = Object.keys(titleToSortKey);

    for (let title of extraTitles) {
      const filmsSorted = filmsSorting(films.slice(), titleToSortKey[title]);
      const FilmsExtraContainer = new FilmsExtra(title);
      const filmsListExtraElementWrap = FilmsExtraContainer.getElement().querySelector(`.films-list__container`);
      render(container, FilmsExtraContainer, RenderPosition.BEFOREEND);
      renderFilms(filmsSorted.slice(0, FILMS_EXTRA_CARDS_COUNT), filmsListExtraElementWrap);
    }

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      filmsRelevant = (sortType === SortType.DEFAULT) ? films.slice() : filmsSorting(filmsRelevant, sortType);

      filmListWrapElement.innerHTML = ``;
      renderFilms(filmsRelevant.slice(0, showingFilmsCount), filmListWrapElement);
    });
  }
}
