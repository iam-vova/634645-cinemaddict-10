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
    this._onFilterChange = this._onFilterChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._filmsModel.setFilterChangeHandler(this._onFilterChange);
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

  _removeFilms() {
    this._showedFilmControllers.forEach((filmsController) => filmsController.destroy());
    this._showedFilmControllers = [];
  }

  _renderFilms(films) {
    const filmListWrapElement = this._container.getElement().querySelector(`.films-list__container`);

    const newFilms = renderFilms(films, filmListWrapElement, this._onDataChange, this._onViewChange);
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

  _updateFilms(films, count) {
    this._removeFilms();
    this._renderFilms(this._filmsModel.getFilms().slice(0, count));
    this._renderLoadMoreButton();
  }

  _onDataChange(movieController, oldData, newData) {
    const isSuccess = this._filmsModel.updateFilm(oldData.id, newData);

    if (isSuccess) {
      movieController.render(newData);
    }
  }

  _onViewChange() {
    this._showedFilmControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    let sortedFilms = [];
    const films = this._filmsModel.getFilms();

    if (sortType === SortType.DEFAULT) {
      sortedFilms = films.slice(0, FILMS_CARDS_COUNT_ON_START);
    } else {
      sortedFilms = this._filmsSorting(films.slice(), sortType);
    }

    this._removeFilms();
    this._renderFilms(sortedFilms);

    if (sortType === SortType.DEFAULT) {
      this._renderLoadMoreButton();
    } else {
      remove(this._loadMoreButtonComponent);
    }
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

  _onFilterChange() {
    this._updateFilms(FILMS_CARDS_COUNT_ON_START);
  }
}
