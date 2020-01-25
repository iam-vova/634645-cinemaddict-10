import {
  getRandomIntegerNumber,
  getRandomArrayItem,
  arrayShuffle,
  generateRandomDate} from '../utils/common.js';
import {generateDate} from "../utils/common";

const userNames = [`Tim Macoveev`, `John Doe`, `John Poole`, `William Cook`, `George Baker`, `Arleen Paul`, `Scarlett Summers`];
const commentTextTotal = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
const emojiNames = [
  `angry.png`,
  `puke.png`,
  `sleeping.png`,
  `smile.png`
];

const generateComment = () => {
  const randomDate = generateRandomDate();

  return {
    id: `${Date.now()}-${Math.random()}`,
    userName: getRandomArrayItem(userNames),
    date: generateDate(randomDate),
    message: arrayShuffle(commentTextTotal.split(` `)).slice(0, getRandomIntegerNumber(5, 10)).join(` `),
    emoji: getRandomArrayItem(emojiNames)
  };
};

const generateComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};

export {generateComment, generateComments};
