import AbstractComponent from './abstract-component.js';
import {filterCount} from '../mock/filter.js';

const createUserRateTemplate = (films) => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${filterCount(films, `history`)}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class UserRate extends AbstractComponent {
  constructor(film) {
    super();

    this._film = film;
  }

  getTemplate() {
    return createUserRateTemplate(this._film);
  }
}
