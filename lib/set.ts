import { Merge } from 'type-fest';

export function set<T>(input: readonly T[], key: number, value: T): readonly T[]
export function set <
  T extends Record<keyof any | K, any>,
  K extends Readonly<keyof any>,
  V
>(
  input: Readonly<T>,
  key: K,
  value: V,
): Merge<T, { [key in K]: V }>
export function set <
  T extends Record<keyof any | K, any>,
  K extends Readonly<keyof any>,
  V
>(
  input: Readonly<T>,
  key: K,
  value: V,
): Merge<T, { [key in K]: V }> {
  if (input[key] === value) {
    return input;
  }

  const result: any = Array.isArray(input) ? [] : {};

  Object.keys(input).forEach((inputKey) => {
    result[inputKey] = inputKey === key ? value : input[inputKey];
  });

  result[key] = value;

  return result;
};
