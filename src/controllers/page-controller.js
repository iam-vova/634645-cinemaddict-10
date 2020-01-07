import FilmsExtra from '../components/films-extra.js';
import NoFilms from '../components/no-films.js';
import SortComponent, {SortType} from '../components/sort.js';
import LoadMoreButton from '../components/load-more-btn.js';
import {render, remove, RenderPosition} from '../utils/render.js';
import MovieController from './movie-controller.js';

const FILMS_CARDS_COUNT_ON_START = 5;
const FILMS_CARDS_COUNT_BY_BUTTON = 5;
const FILMS_EXTRA_CARDS_COUNT = 2;

const renderFilms = (films, container, onDataChange, onViewChange) => {
  return films.map((film) => {
    const movieController = new MovieController(container, onDataChange, onViewChange);
    movieController.render(film);

    return movieController;
  });
};

export default class PageController {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;

    this._showingFilmsCount = FILMS_CARDS_COUNT_ON_START;
    this._showedFilmControllers = [];
    this._noFilmsComponent = new NoFilms();
    this._sortComponent = new SortComponent();
    this._loadMoreButtonComponent = new LoadMoreButton();

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onLoadMoreButtonClick = this._onLoadMoreButtonClick.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render() {
    const container = this._container.getElement();
    const films = this._filmsModel.getFilms();

    this._filmListWrapElement = this._container.getElement().querySelector(`.films-list__container`);

    if (films.length === 0) {
      render(this._filmListWrapElement, this._noFilmsComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._sortComponent, RenderPosition.BEFORE);

    this._renderFilms(films.slice(0, this._showingFilmsCount));

    this._renderLoadMoreButton();

    const titleToSortKey = {
      "Top rated": `rate`,
      "Most commented": `commentsCont`,
    };

    const extraTitles = Object.keys(titleToSortKey);

    for (let title of extraTitles) {
      const filmsSorted = this._filmsSorting(films.slice(), titleToSortKey[title]);
      const FilmsExtraContainer = new FilmsExtra(title);
      const filmsListExtraElementWrap = FilmsExtraContainer.getElement().querySelector(`.films-list__container`);
      render(this._container.getElement(), FilmsExtraContainer, RenderPosition.BEFOREEND);
      renderFilms(filmsSorted.slice(0, FILMS_EXTRA_CARDS_COUNT), filmsListExtraElementWrap, this._onDataChange, this._onViewChange);
    }
  }

  _renderFilms(films) {
    const newFilms = renderFilms(films, this._filmListWrapElement, this._onDataChange, this._onViewChange);

    this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);
    this._showingFilmsCount = this._showedFilmControllers.length;
  }

  _renderLoadMoreButton() {
    remove(this._loadMoreButtonComponent);

    if (this._showingFilmsCount >= this._filmsModel.getFilms().length) {
      return;
    }

    const filmListElement = this._container.getElement().querySelector(`.films-list`);
    render(filmListElement, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);
    this._loadMoreButtonComponent.setClickHandler(this._onLoadMoreButtonClick);
  }

  _onDataChange(movieController, oldData, newData) {
    const index = this._films.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));

    movieController.render(this._films[index]);
  }

  _onViewChange() {
    this._showedFilmControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    this._filmsRelevant = (sortType === SortType.DEFAULT) ? this._films.slice() : this._filmsSorting(this._filmsRelevant, sortType);

    this._filmListWrapElement.innerHTML = ``;
    renderFilms(this._filmsRelevant.slice(0, this._showingFilmsCount), this._filmListWrapElement, this._onDataChange, this._onViewChange);
  }

  _filmsSorting(filmsArr, key) {
    return filmsArr.sort((a, b) => b[key] - a[key]);
  }

  _onLoadMoreButtonClick() {
    const prevFilmsCount = this._showingFilmsCount;
    const films = this._filmsModel.getFilms();

    this._showingFilmsCount = this._showingFilmsCount + FILMS_CARDS_COUNT_BY_BUTTON;

    this._renderFilms(films.slice(prevFilmsCount, this._showingFilmsCount));

    if (this._showingFilmsCount >= films.length) {
      remove(this._loadMoreButtonComponent);
    }
  }
}
