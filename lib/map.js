const set =  require('./set');

const map = (input, fn) => {
  let result = input;

  for (const key in input) {
    result = set(result, key, fn(input[key], key));
  }

  return result;
};

module.exports = map;