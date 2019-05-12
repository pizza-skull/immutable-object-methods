import {
  setIn,
  mergeDeep,
  assign,
  set,
  without,
} from 'immutable-object-methods';

const input = { a: { b: 'c' } };
const updated = setIn(input, ['a', 'd'], 'e');

console.log(input);
console.log(updated);

const merged = mergeDeep({ foo: 'bar' }, { beep: { boop: 4711 }, foo: 'bas' });
console.log(merged);

// immutable assign
const assigned = assign({ foo: 'bar' }, { foz: 'baz' });
console.log(assigned);

const data = set({ beep: 'boop' }, 'foo', 'bar');
console.log(data);

const beep = without({ foo: 'bar' }, 'foo');
console.log(beep);

