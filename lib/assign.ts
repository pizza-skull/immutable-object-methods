import { set } from './set';

export const assign = (input: object, ...args: object[]) => {
  const changes = {};

  args.forEach((obj) => {
    for (const key in obj) {
      changes[key] = obj[key];
    }
  });

  let result = input;

  for (const key in changes) {
    result = set(result, key, changes[key]);
  }

  return result;
};
