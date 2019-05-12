import { set } from './set';

export const setIn = (
  input: Readonly<any> = {},
  [key, ...rest]: ReadonlyArray<string | number>,
  value: any,
): any => {
  const newChild = rest.length ? setIn(input[key], rest, value) : value;

  return set(input, key, newChild);
};
