import { set } from './set';

export const setIn = (
  input: Readonly<object> = {},
  [key, ...rest]: ReadonlyArray<string | number>,
  value: any,
) => {
  const newChild = rest.length ? setIn(input[key], rest, value) : value;

  return set(input, key, newChild);
};
