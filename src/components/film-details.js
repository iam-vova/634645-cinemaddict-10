import AbstractSmartComponent from './abstract-smart-component.js';
import Comments from '../components/comments.js';
import FilmDetailsMiddle from '../components/film-user-rate.js';
import {render, remove, RenderPosition} from '../utils/render.js';
import {formatDate} from '../utils/common.js';

const checkboxNameToLabel = {
  watchlist: `Add to watchlist`,
  watched: `Already watched`,
  favorite: `Add to favorites`
};

const createFilmControlsMarkup = (label, isActive) => {
  return (
    `<input type="checkbox" class="film-details__control-input visually-hidden" id="${label}" name="${label}"
        ${isActive ? `checked` : ``}>
    <label for="${label}" class="film-details__control-label film-details__control-label--${label}">${checkboxNameToLabel[label]}</label>`
  );
};

const createFilmDetailsTemplate = (film) => {
  const {poster,
    title,
    titleOriginal,
    rate,
    producer,
    screenwriter,
    actors,
    releaseDate,
    duration,
    genre,
    country,
    descriptionFull,
    ageRestriction,
  } = film;

  const watchlistInput = createFilmControlsMarkup(`watchlist`, film.toWatch);
  const historyInput = createFilmControlsMarkup(`watched`, film.isWatched);
  const favoritesInput = createFilmControlsMarkup(`favorite`, film.isFavorite);

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">

              <p class="film-details__age">${ageRestriction}</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">Original: ${titleOriginal}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rate}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${producer}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${screenwriter}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${formatDate(releaseDate)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${duration}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">
                    <span class="film-details__genre">${genre[0]},</span>
                    <span class="film-details__genre">${genre[1]},</span>
                    <span class="film-details__genre">${genre[2]}</span></td>
                </tr>
              </table>

              <p class="film-details__film-description">
                ${descriptionFull}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            ${watchlistInput}
            ${historyInput}
            ${favoritesInput}
          </section>
        </div>

        <div class="form-details__bottom-container"></div>
      </form>
    </section>`.trim()
  );
};

export default class FilmDetails extends AbstractSmartComponent {
  constructor(film) {
    super();

    this._film = film;
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._film);
  }

  recoveryListeners() {
    this.subscribeOnEvents();
  }

  rerender() {
    super.rerender();
  }

  subscribeOnEvents() {
    const element = this.getElement();
    this._filmDetailsMiddleComponent = new FilmDetailsMiddle(this._film);

    this._showUserRateMiddle();

    element.querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, () => {
        this._film.toWatch = !this._film.toWatch;

        this.rerender();
      });

    element.querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, () => {
        this._film.isWatched = !this._film.isWatched;

        this.rerender();
      });

    element.querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, () => {
        this._film.isFavorite = !this._film.isFavorite;

        this.rerender();
      });

    element.querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, () => {
        remove(this);
      });

    // element.querySelectorAll(`.film-details__emoji-label img`).forEach((emoji) =>
    //   emoji.addEventListener(`click`, () => {
    //     // TODO: move to comments-controller.js
    //     const emojiContainer = element.querySelector(`.film-details__add-emoji-label`);
    //     emojiContainer.innerHTML = ``;
    //     const bigEmoji = emoji.cloneNode(false);
    //     bigEmoji.width = 55;
    //     bigEmoji.height = 55;
    //     emojiContainer.appendChild(bigEmoji);
    //   })
    // );
  }

  _showUserRateMiddle() {
    if (this._film.isWatched) {
      this._commnetsContainer = this.getElement().querySelector(`.form-details__bottom-container`);
      render(this._commnetsContainer, this._filmDetailsMiddleComponent, RenderPosition.BEFORE);
    } else {
      remove(this._filmDetailsMiddleComponent);
    }
  }
}
