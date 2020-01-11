import AbstractComponent from './abstract-component.js';
import {FilterType} from '../const.js';

const createFilterMarkup = (filter, isChecked) => {
  const {name, count} = filter;
  const filterLink = Object.keys(FilterType).find(key => FilterType[key] === name).toLowerCase();

  return (
    `<a href="#${filterLink}" id="${filterLink}" class="main-navigation__item ${isChecked ? `main-navigation__item--active` : ``}">${name} <span class="main-navigation__item-count">${count}</span></a>`
  );
};

const createSiteMenuTemplate = (filters) => {
  const filtersMarkup = filters.map((it) => createFilterMarkup(it, it.checked)).join(`\n`);

  return (
    `<nav class="main-navigation">
      ${filtersMarkup}
      <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
    </nav>`
  );
};

export default class SiteMenu extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;
  }

  getTemplate() {
    return createSiteMenuTemplate(this._filters);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      const filterName = evt.target.id;
      handler(filterName);
    });
  }
}
