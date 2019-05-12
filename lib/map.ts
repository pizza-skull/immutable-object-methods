import { set } from './set';

export const map = <T, U>(
  input: Readonly<Record<keyof any, T>>,
  fn: (obj: Readonly<T>, key: string) => U,
): Record<keyof any, U> => {
  let result: any = input;

  for (const key in input) {
    result = set(result, key, fn(input[key], key));
  }

  return result;
};
