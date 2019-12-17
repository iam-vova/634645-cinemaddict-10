export const getRandomFloatNumber = (min, max) => {
  return Math.random() * (max - min) + min;
};

export const getRandomIntegerNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length - 1);

  return array[randomIndex];
};

export const arrayShuffle = (array) => {
  let l;
  let temp;
  for (let k = array.length - 1; k--;) {
    l = getRandomIntegerNumber(0, array.length - 1);
    temp = array[l];
    array[l] = array[k];
    array[k] = temp;
  }
  return array;
};

export const getTimeFromMins = (mins) => {
  let hours = Math.trunc(mins / 60);
  let minutes = mins % 60;
  return hours === 0 ? minutes + `m` : hours + `h ` + minutes + `m`;
};

export const generateRandomDate = () => {
  const minDate = new Date(1895, 3, 22).getTime();
  const maxDate = new Date().getTime();
  return new Date(minDate + Math.random() * (maxDate - minDate));
};
