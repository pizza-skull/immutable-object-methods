import { set } from './set';

export const map = <T extends Readonly<any>, K extends keyof T, U>(
  input: T,
  fn: (obj: Readonly<T[K]>, key: string) => U,
): {[key in K]: U} => {
  let result: any = input;

  for (const key in input) {
    result = set(result, key, fn(input[key], key));
  }

  return result;
};
