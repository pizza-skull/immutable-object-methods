import { Merge } from 'type-fest';

import { set } from './set';

type ArgType = Record<keyof any, any>;

class Wrapper {
  static assign<T>(input: Readonly<T>): T;
  static assign<T, U extends ArgType>(
    input: Readonly<T>,
    arg: Readonly<U>,
  ): Merge<T, U>;
  static assign<T, U extends ArgType, V extends ArgType>(
    input: Readonly<T>,
    args1: Readonly<U>,
    args2: Readonly<V>,
  ): Merge<T, Merge<U, V>>;
  static assign<T, U extends ArgType, V extends ArgType, W extends ArgType>(
    input: Readonly<T>,
    args1: Readonly<U>,
    args2: Readonly<V>,
    args3: Readonly<W>,
  ): Merge<T, Merge<U, Merge<V, W>>>;
  static assign(input: any, ...args: any[]) {
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
}

export const assign = Wrapper.assign;
