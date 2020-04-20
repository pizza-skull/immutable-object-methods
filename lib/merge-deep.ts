import { set } from './set';
import { Merge } from 'type-fest';

const isObject = (obj: unknown) =>
  typeof obj === 'object' && obj !== null && !Array.isArray(obj);


export function mergeDeep <InputType, ChangesType>(
  input: InputType,
  changes: ChangesType,
): Merge<InputType, ChangesType> 

export function mergeDeep(input: any, changes: any) {
  let result = input;

  for (const key in changes) {
    const childChange = changes[key];

    const newChild = isObject(childChange)
      ? mergeDeep(input[key] || {}, childChange)
      : childChange;

    result = set(result, key, newChild);
  }

  return result;
};
