import AbstractComponent from './abstract-component.js';

const createFilmCardTemplate = (film) => {
  const {poster, title, rate, year, duration, genre, description, commentsCont} = film;

  return (
    `<article class="film-card">
          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${rate}</p>
          <p class="film-card__info">
            <span class="film-card__year">${year}</span>
            <span class="film-card__duration">${duration}</span>
            <span class="film-card__genre">${genre[0]}</span>
          </p>
          <img src="./images/posters/${poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${description}</p>
          <a class="film-card__comments">${commentsCont} comments</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${film.toWatch ? `film-card__controls-item--active` : ``}">
                Add to watchlist
            </button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${film.isWatched ? `film-card__controls-item--active` : ``}">
                Mark as watched
            </button>
            <button class="film-card__controls-item button film-card__controls-item--favorite ${film.isFavorite ? `film-card__controls-item--active` : ``}">
                Mark as favorite
            </button>
          </form>
        </article>`
  );
};

export default class FilmCard extends AbstractComponent {
  constructor(film) {
    super();

    this._film = film;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  setFilmCardClickHandler(handler) {
    this.getElement().querySelectorAll(`.film-card__poster, .film-card__title, .film-card__comments`)
      .forEach((element) => element.addEventListener(`click`, handler));
  }

  setWatchlistButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, handler);
  }

  setWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, handler);
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, handler);
  }
}

