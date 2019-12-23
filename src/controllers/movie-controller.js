import FilmCard from '../components/film-card.js';
import FilmDetails from '../components/film-details.js';
import Comment from '../components/comments.js';
import {render, remove, RenderPosition} from '../utils/render.js';

export default class MovieController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;

    this._filmComponent = null;
    this._filmDetailsComponent = null;
  }

  render(film) {
    const oldFilmComponent = this._filmComponent;
    const oldFilmDetailsComponent = this._filmDetailsComponent;

    this._filmComponent = new FilmCard(film);
    this._filmDetailsComponent = new FilmDetails(film);

    this._filmComponent.setWatchlistButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        toWatch: !film.toWatch,
      }));
    });

    this._filmComponent.setWatchedButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatched: !film.isWatched,
      }));
    });

    this._filmComponent.setFavoriteButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isFavorite: !film.isFavorite,
      }));
    });

    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

      if (isEscKey) {
        replacePopup();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const replacePopup = () => {
      remove(this._filmDetailsComponent);
    };

    const siteMainElement = document.querySelector(`.main`);
    const comments = film.comments;

    this._filmComponent.setFilmCardClickHandler(() => {
      render(siteMainElement, this._filmDetailsComponent, RenderPosition.BEFOREEND);
      const filmDetailsComments = this._filmDetailsComponent.getElement().querySelector(`.film-details__comments-list`);
      comments.forEach((comment) => render(filmDetailsComments, new Comment(comment), RenderPosition.BEFOREEND));

      document.addEventListener(`keydown`, onEscKeyDown);
      this._filmDetailsComponent.setFilmDetailsCloseHandler(() => {
        replacePopup();
      });
    });

    render(this._container, this._filmComponent, RenderPosition.BEFOREEND);
  }
}
