import FilmCard from '../components/film-card.js';
import FilmDetails from '../components/film-details.js';
import {render, remove, replace, RenderPosition} from '../utils/render.js';
import CommentsController from "./comments-controller";

const Mode = {
  DEFAULT: `default`,
  DETAILS: `details`,
};

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._filmComponent = null;
    this._filmDetailsComponent = null;
    this._filmComments = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
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

    const siteMainElement = document.querySelector(`.main`);

    this._filmComponent.setFilmCardClickHandler(() => {
      this._onViewChange();
      this._mode = Mode.DETAILS;
      render(siteMainElement, this._filmDetailsComponent, RenderPosition.BEFOREEND);
      document.addEventListener(`keydown`, this._onEscKeyDown);
      this._filmDetailsComponent.subscribeOnEvents();

      this.renderComments(film);
    });

    if (oldFilmComponent && oldFilmDetailsComponent) {
      replace(this._filmComponent, oldFilmComponent);
      replace(this._filmDetailsComponent, oldFilmDetailsComponent);
    } else {
      render(this._container, this._filmComponent, RenderPosition.BEFOREEND);
    }
  }

  renderComments(film) {
    const container = this._filmDetailsComponent.getElement().querySelector(`.form-details__bottom-container`);
    // const newFilm = Object.assign({}, film);
    this._filmComments = new CommentsController(container, film);
    // (commentsController, oldComment, newComment) => {
    //   if (oldComment === null) {
    //     newFilm.comments.unshift(newComment);
    //   } else if (newComment === null) {
    //     newFilm.comments = newFilm.comments.filter((comment) => comment.id !== oldComment.id);
    //   }
    //
    //   // TODO: how to do rerendering
    //   // this._filmDetailsComponent.rerender();
    // });

    this._filmComments.render(film.comments);
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replacePopup();
    }
  }

  destroy() {
    remove(this._filmDetailsComponent);
    remove(this._filmComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _replacePopup() {
    remove(this._filmDetailsComponent);

    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._replacePopup();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}
