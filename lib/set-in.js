// @ts-check

const set = require('./set');

/**
 *
 * @param {Readonly<Object>} input
 * @param {ReadonlyArray<(string|number)>} key
 * @param {any} value
 */
const setIn = (input = {}, [key, ...rest], value) => {
  const newChild = rest.length ? setIn(input[key], rest, value) : value;

  return set(input, key, newChild);
};

module.exports = setIn;
