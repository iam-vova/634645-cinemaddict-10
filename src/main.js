import SiteMenu from './components/site-menu.js';
import UserRate from './components/user-rate.js';
import Films from './components/films.js';
import FilmsModel from './models/movies.js'
import PageController from './controllers/page-controller.js';
import {generateFilmCards} from './mock/film-card.js';
import {render, RenderPosition} from './utils/render.js';

const FILMS_CARDS_COUNT = 15;

const films = generateFilmCards(FILMS_CARDS_COUNT);
const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, new SiteMenu(films), RenderPosition.BEFOREEND);

const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, new UserRate(films), RenderPosition.BEFOREEND);

const filmsComponent = new Films();
render(siteMainElement, filmsComponent, RenderPosition.BEFOREEND);

const pageController = new PageController(filmsComponent, filmsModel);
pageController.render();

const footerStat = document.querySelector(`.footer .footer__statistics p`);
footerStat.innerHTML = `${films.length} movies inside`;
