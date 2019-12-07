const getRandomFloatNumber = (min, max) => {
  return Math.random() * (max - min) + min;
};

const getRandomIntegerNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length - 1);

  return array[randomIndex];
};

const arrayShuffle = (array) => {
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

const getTimeFromMins = (mins) => {
  let hours = Math.trunc(mins / 60);
  let minutes = mins % 60;
  return hours === 0 ? minutes + `m` : hours + `h ` + minutes + `m`;
};

export {getRandomFloatNumber, getRandomIntegerNumber, getRandomArrayItem, arrayShuffle, getTimeFromMins};


