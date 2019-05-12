const set = require('./set');

const isObject = (obj) =>
  typeof obj === 'object' && obj !== null && !Array.isArray(obj);

const mergeDeep = (input = {}, changes) => {
  let result = input;

  for (const key in changes) {
    const childChange = changes[key];

    const newChild = isObject(childChange)
      ? mergeDeep(input[key], childChange)
      : childChange;

    result = set(result, key, newChild);
  }

  return result;
};

module.exports = mergeDeep;
