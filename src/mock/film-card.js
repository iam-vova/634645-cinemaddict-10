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

const getRandomRating = () => {
  const minRate = 0.1;
  const maxRate = 10;
  return getRandomFloatNumber(minRate, maxRate).toFixed(1);
};

const getRandomFilmYear = () => {
  const minYear = 1895;
  const maxYear = new Date();
  return getRandomIntegerNumber(minYear, maxYear.getFullYear());
};

const FilmGenres = [
  `Musical`,
  `Western`,
  `Drama`,
  `Comedy`,
  `Cartoon`,
  `Mystery`
];

const FilmNamesCopy = arrayShuffle(FilmNames.slice());

const FilmDescritptionTotal = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const generateFilmCard = () => {
  const FilmDescription = arrayShuffle(FilmDescritptionTotal.split(`. `)).slice(0, 3).join(`. `).substr(0, 137).concat(`...`);
  const duration = getTimeFromMins(getRandomIntegerNumber(50, 360));

  return {
    poster: getRandomArrayItem(PosterNames),
    title: FilmNamesCopy.pop(),
    rate: getRandomRating(),
    year: getRandomFilmYear(),
    duration,
    genre: getRandomArrayItem(FilmGenres),
    description: FilmDescription,
    commentsCont: getRandomIntegerNumber(0, 999),
  };
};

const generateFilmCards = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilmCard);
};

export {generateFilmCard, generateFilmCards};


