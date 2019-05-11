import assign from './assign';

const without = (input, key) => {
  if (!key in input) {
    return input;
  }

  const result = assign(input);
  delete result[key];
  return result;
};

export default without;
