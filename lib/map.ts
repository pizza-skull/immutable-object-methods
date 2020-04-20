import { set } from './set';

export function map<T extends ReadonlyArray<any>, K extends number, U>(
  input: T,
  fn: (obj: Readonly<T[K]>, key: number) => U,
): Array<U>;

export function map<T extends Readonly<any>, K extends keyof T, U>(
  input: T,
  fn: (obj: Readonly<T[K]>, key: string) => U,
): { [key in K]: U };

export function map(input: any, fn: any) {
  let result: any = input;

  for (const key in input) {
    result = set(result, key, fn(input[key], key));
  }

  return result;
}
