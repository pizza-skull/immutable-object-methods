import { set } from './set';

class Wrapper {
  static map<T extends ReadonlyArray<any>, K extends number, U>(
    input: T,
    fn: (obj: Readonly<T[K]>, key: number) => U,
  ): Array<U>;
  static map<T extends Readonly<any>, K extends keyof T, U>(
    input: T,
    fn: (obj: Readonly<T[K]>, key: string) => U,
  ): { [key in K]: U };
  
  static map(input: any, fn: any) {
    let result: any = input;
  
    for (const key in input) {
      result = set(result, key, fn(input[key], key));
    }
  
    return result;
  }
}

export const map = Wrapper.map;
