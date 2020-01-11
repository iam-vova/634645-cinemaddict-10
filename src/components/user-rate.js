import AbstractComponent from './abstract-component.js';

const createUserRateTemplate = (films) => {
  let userRate;
  if (films >= 21) {
    userRate = `movie buff`;
  } else if (films >= 10 && films < 21) {
    userRate = `fan`;
  } else if (films >= 1 && films < 10) {
    userRate = `novice`;
  } else {
    userRate = ``;
  }

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${userRate}</p>
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

