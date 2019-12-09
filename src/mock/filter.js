const filterCount = (films, parametr) => {
  return films.filter((it) => it[parametr] === true).length;
};

export {filterCount};
