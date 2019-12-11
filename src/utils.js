export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

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

const generateRandomDate = () => {
  const minDate = new Date(1895, 3, 22).getTime();
  const maxDate = new Date().getTime();
  return new Date(minDate + Math.random() * (maxDate - minDate));
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export {getRandomFloatNumber, getRandomIntegerNumber, getRandomArrayItem, arrayShuffle, getTimeFromMins, generateRandomDate};


