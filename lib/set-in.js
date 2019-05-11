import set from './set';

const setIn = (input = {}, [key, ...rest], value) => {
  const newChild = rest.length ? setIn(input[key], rest, value) : value;

  return set(input, key, newChild);
};

export default setIn;
