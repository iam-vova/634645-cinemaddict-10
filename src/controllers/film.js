import FilmCard from '../components/film-card.js';
import FilmDetails from '../components/film-details.js';
import Comment from '../components/comments.js';
import {render, remove, RenderPosition} from '../utils/render.js';

export default class MovieController {
  constructor(container) {
    this._container = container;

    this._filmComponent = null;
    this._filmDetailsComponent = null;
  }

  render(film) {
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
    this._filmComponent = new FilmCard(film);
    this._filmDetailsComponent = new FilmDetails(film);
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
