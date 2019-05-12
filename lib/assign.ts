import { Merge } from 'type-fest';

import { set } from './set';

type ResultType<T,U,V,W> = Merge<T, Merge<U, Merge<V, W>>>;

export const assign = <T, U extends object, V extends object, W extends object>(
  input: T,
  arg1?: U,
  arg2?: V,
  arg3?: W
): ResultType<T,U,V,W> => {
  const changes = {};

  const args = [arg1, arg2, arg3].filter(Boolean);

  args.forEach((obj) => {
    for (const key in obj) {
      changes[key] = obj[key];
    }
  });

  let result: any = input;

  for (const key in changes) {
    result = set(result, key, changes[key]);
  }

  return result;
};
