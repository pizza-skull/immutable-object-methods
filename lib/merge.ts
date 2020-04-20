import { Merge } from 'type-fest';

import { set } from './set';

type ArgType = Record<keyof any, any>;

type _Merge<T, U> = T extends Merge<T, U> ? T : Merge<T, U>;

export function merge<T>(input: Readonly<T>): T;
export function merge<T, U extends ArgType>(
  input: Readonly<T>,
  arg: Readonly<U>,
): _Merge<T, U>;
export function merge<T, U extends ArgType, V extends ArgType>(
  input: Readonly<T>,
  args1: Readonly<U>,
  args2: Readonly<V>,
): _Merge<_Merge<T, U>, V>;
export function merge<
  T,
  U extends ArgType,
  V extends ArgType,
  W extends ArgType
>(
  input: Readonly<T>,
  args1: Readonly<U>,
  args2: Readonly<V>,
  args3: Readonly<W>,
): _Merge<_Merge<_Merge<T, U>, V>, W>;
export function merge(input: any, ...args: any[]): any;
export function merge(input: any, ...args: any[]) {
  const changes: any = {};
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
}
