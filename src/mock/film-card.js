import {getRandomFloatNumber, getRandomIntegerNumber, getRandomArrayItem, arrayShuffle, getTimeFromMins} from '../utils.js';

const PosterNames = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`
];

const FilmNames = [
  `The Shawshank Redemption`,
  `The Green Mile`,
  `Forrest Gump`,
  `Schindler's List`,
  `Intouchables`,
  `Inception`,
  `Léon`,
  `The Lion King`,
  `Fight Club`,
  `Иван Васильевич меняет профессию`,
  `La vita è bella`,
  `Knockin' on Heaven's Door`,
  `The Godfather`,
  `Pulp Fiction`,
  `Операция «Ы» и другие приключения Шурика`
];

const FilmNamesCopy = arrayShuffle(FilmNames.slice());

const getRandomRating = () => {
  const minRate = 0.1;
  const maxRate = 10;
  return getRandomFloatNumber(minRate, maxRate).toFixed(1);
};

const generateRandomDate = () => {
  const minDate = new Date(1895, 3, 22).getTime();
  const maxDate = new Date().getTime();
  return new Date(minDate + Math.random() * (maxDate - minDate));
};

const filmGenres = [`Musical`, `Western`, `Drama`, `Comedy`, `Cartoon`, `Mystery`];

const producers = [`Frank Darabont`, `Robert Zemeckis`, `Steven Spielberg`, `Olivier Nakache`, `Christopher Nolan`, `Roger Allers`];
const screenwriters = [`Philippe Pozzo di Borgo`, `Éric Toledano`, `Christopher Nolan`, `Irene Mecchi`, `Jonathan Roberts`, `Linda Woolverton`, `Burny Mattinson`];
const actors = [`Leonardo DiCaprio`, `Joseph Gordon-Levitt`, `Ellen Page`, `Tom Hardy`, `Ken Watanabe`, `Dileep Rao`, `Cillian Murphy`, `Tom Berenger`, `Marion Cotillard`, `Pete Postlethwaite`];
const countries = [`USA`, `France`, `Italy`, `Germany`, `Russia`, `USSR`, `Poland`, `Canada`, `Japan`, `China`];

const FilmDescritptionTotal = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const generateFilmCard = () => {
  const FilmDescription = arrayShuffle(FilmDescritptionTotal.split(`. `)).slice(0, 3).join(`. `);
  const duration = getTimeFromMins(getRandomIntegerNumber(50, 360));
  const title = FilmNamesCopy.pop();

  const releaseDate = generateRandomDate();
  const releaseDateYear = releaseDate.getFullYear();
  const releaseDateMonth = releaseDate.toLocaleString(`en-US`, {month: `long`});
  const releaseDateDay = releaseDate.getDate();

  return {
    poster: getRandomArrayItem(PosterNames),
    title,
    titleOriginal: title,
    rate: getRandomRating(),
    producer: getRandomArrayItem(producers),
    screenwriter: getRandomArrayItem(screenwriters),
    actors: arrayShuffle(actors).slice(0, getRandomIntegerNumber(2, 5)).join(`, `),
    releaseDate: `${releaseDateDay} ${releaseDateMonth} ${releaseDateYear}`,
    year: releaseDateYear,
    duration,
    genre: arrayShuffle(filmGenres).slice(0, 3),
    country: getRandomArrayItem(countries),
    description: FilmDescription.substr(0, 137).concat(`...`),
    descriptionFull: FilmDescription,
    ageRestriction: `${getRandomIntegerNumber(0, 21)}+`,
    commentsCont: getRandomIntegerNumber(0, 999),
    watchlist: Math.random() > 0.5,
    history: Math.random() > 0.5,
    favorites: Math.random() > 0.5,
  };
};

const generateFilmCards = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilmCard);
};

export {generateFilmCard, generateFilmCards};

