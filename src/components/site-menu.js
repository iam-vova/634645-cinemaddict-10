import AbstractComponent from './abstract-component.js';
import {filterCount} from '../mock/filter.js';

const createSiteMenuTemplate = (films) => {
  return (
    `<nav class="main-navigation">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${filterCount(films, `watchlist`)}</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${filterCount(films, `history`)}</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${filterCount(films, `favorites`)}</span></a>
      <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
    </nav>`
  );
};

export default class SiteMenu extends AbstractComponent {
  constructor(film) {
    super();

    this._film = film;
  }

  getTemplate() {
    return createSiteMenuTemplate(this._film);
  }
}
