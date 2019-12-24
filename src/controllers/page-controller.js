import FilmsExtra from '../components/films-extra.js';
import NoFilms from '../components/no-films.js';
import SortComponent, {SortType} from '../components/sort.js';
import LoadMoreButton from '../components/load-more-btn.js';
import {render, remove, RenderPosition} from '../utils/render.js';
import MovieController from './movie-controller.js';

const FILMS_CARDS_COUNT_ON_START = 5;
const FILMS_CARDS_COUNT_BY_BUTTON = 5;
const FILMS_EXTRA_CARDS_COUNT = 2;

const renderFilms = (films, container, onDataChange) => {
  return films.map((film) => {
    const movieController = new MovieController(container, onDataChange);
    movieController.render(film);

    return movieController;
  });
};

export default class PageController {
  constructor(container) {
    this._container = container;

    this._showingFilmsCount = FILMS_CARDS_COUNT_ON_START;
    this._showedFilmControllers = [];
    this._noFilmsComponent = new NoFilms();
    this._sortComponent = new SortComponent();
    this._loadMoreButtonComponent = new LoadMoreButton();

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(films) {
    this._films = films;
    this._filmsRelevant = this._films.slice();

    const container = this._container.getElement();
    this._filmListWrapElement = this._container.getElement().querySelector(`.films-list__container`);

    if (this._filmsRelevant.length === 0) {
      render(this._filmListWrapElement, this._noFilmsComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._sortComponent, RenderPosition.BEFORE);
    renderFilms(this._filmsRelevant.slice(0, this._showingFilmsCount), this._filmListWrapElement, this._onDataChange);

    this._renderLoadMoreButton();

    const titleToSortKey = {
      "Top rated": `rate`,
      "Most commented": `commentsCont`,
    };

    const extraTitles = Object.keys(titleToSortKey);

    for (let title of extraTitles) {
      const filmsSorted = this._filmsSorting(this._films.slice(), titleToSortKey[title]);
      const FilmsExtraContainer = new FilmsExtra(title);
      const filmsListExtraElementWrap = FilmsExtraContainer.getElement().querySelector(`.films-list__container`);
      render(this._container.getElement(), FilmsExtraContainer, RenderPosition.BEFOREEND);
      renderFilms(filmsSorted.slice(0, FILMS_EXTRA_CARDS_COUNT), filmsListExtraElementWrap, this._onDataChange);
    }
  }

  _renderLoadMoreButton() {
    if (this._showingFilmsCount >= this._filmsRelevant.length) {
      return;
    }

    const filmListElement = this._container.getElement().querySelector(`.films-list`);
    render(filmListElement, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);

    this._loadMoreButtonComponent.setClickHandler(() => {
      const prevFilmsCount = this._showingFilmsCount;
      this._showingFilmsCount = this._showingFilmsCount + FILMS_CARDS_COUNT_BY_BUTTON;

      const newFilms = renderFilms(this._filmsRelevant.slice(prevFilmsCount, this._showingFilmsCount), this._filmListWrapElement, this._onDataChange);
      this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);

      if (this._showingFilmsCount >= this._filmsRelevant.length) {
        remove(this._loadMoreButtonComponent);
      }
    });
  }

  _onDataChange(movieController, oldData, newData) {
    const index = this._films.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));

    movieController.render(this._films[index]);
  }

  _onSortTypeChange(sortType) {
    this._filmsRelevant = (sortType === SortType.DEFAULT) ? this._films.slice() : this._filmsSorting(this._filmsRelevant, sortType);

    this._filmListWrapElement.innerHTML = ``;
    renderFilms(this._filmsRelevant.slice(0, this._showingFilmsCount), this._filmListWrapElement, this._onDataChange);
  }

  _filmsSorting(filmsArr, key) {
    return filmsArr.sort((a, b) => b[key] - a[key]);
  }
}
