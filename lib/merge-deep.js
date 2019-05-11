import assign from './assign';
import set from './set';

const isObject = (obj) =>
  typeof obj === 'object' && obj !== null && !Array.isArray(obj);

const mergeDeep = (input = {}, changes) => {
  let result = input;

  Object.keys(changes).forEach((key) => {
    const childChange = changes[key];

    const newChild = isObject(childChange)
      ? mergeDeep(input[key], childChange)
      : childChange;

    if (result[key] !== newChild) {
      if (result === input) {
        result = assign(input, {
          [key]: newChild,
        });
      } else {
        result[key] = newChild;
      }
    }
  });

  return result;
};

export default mergeDeep;
