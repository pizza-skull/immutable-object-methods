import { set } from './set';

const isObject = (obj: unknown) =>
  typeof obj === 'object' && obj !== null && !Array.isArray(obj);

export const mergeDeep = (input: Object = {}, changes: Object): any => {
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
