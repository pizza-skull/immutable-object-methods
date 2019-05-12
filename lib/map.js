// @ts-check

const set = require('./set');

/**
 *
 * @template {Object} T
 * @param {Readonly<{[key: string]: T}>} input
 * @param {(obj: Readonly<T>, key: string) => unknown} fn
 */
const map = (input, fn) => {
  let result = input;

  for (const key in input) {
    result = set(result, key, fn(input[key], key));
  }

  return result;
};

module.exports = map;
