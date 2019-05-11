import set from './set';

const map = (input, fn) => {
  let result = input;

  for (const key in input) {
    result = set(result, key, fn(input[key], key));
  }

  return result;
};

export default map;
