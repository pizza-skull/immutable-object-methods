const set = require ('./set');

const setIn = (input = {}, [key, ...rest], value) => {
  const newChild = rest.length ? setIn(input[key], rest, value) : value;

  return set(input, key, newChild);
};

module.exports = setIn;