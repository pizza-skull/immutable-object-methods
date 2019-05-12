import { Merge } from 'type-fest';

export const set = <
  T extends Record<keyof any | K, any>,
  K extends Readonly<keyof any>,
  V
>(
  input: Readonly<T>,
  key: K,
  value: V,
): Merge<T, { [key in K]: V }> => {
  if (input[key] === value) {
    return input;
  }

  const result: any = {};

  Object.keys(input).forEach((inputKey) => {
    result[inputKey] = inputKey === key ? value : input[inputKey];
  });

  result[key] = value;

  return result;
};
