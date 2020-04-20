import test from 'ava';
import { merge, mergeDeep, setIn, set, without, map } from './lib';

test('set', (t) => {
  const input = Object.freeze({ a: 'b' });
  const actual = set(input, 'foo', 'bar');
  const expected = {
    a: 'b',
    foo: 'bar',
  };
  t.deepEqual(actual, expected);
});

test('set with unchanged data', (t) => {
  const input = Object.freeze({ foo: 'bar' });
  const actual = set(input, 'foo', 'bar');
  const expected = input;
  t.is(actual, expected);
});

test('setIn', (t) => {
  const input = Object.freeze({});
  const actual = setIn(input, Object.freeze(['a', 'b', 'c']), 'foo');
  const expected = {
    a: {
      b: {
        c: 'foo',
      },
    },
  };
  t.deepEqual(actual, expected);
});

test('setIn with unchanged array', (t) => {
  const input = Object.freeze({
    a: 'b',
    c: [1, 2, 3],
  });
  const actual = setIn(input, Object.freeze(['a']), 'yo');
  const expected = {
    a: 'yo',
    c: [1, 2, 3],
  };
  t.deepEqual(actual, expected);
  t.is(actual.c, input.c);
});

test('setIn with unchanged value', (t) => {
  const input = Object.freeze({
    a: {
      b: 'c',
    },
  });
  const actual = setIn(input, Object.freeze(['a', 'b']), 'c');
  const expected = input;
  t.is(actual, expected);
});

test('setIn with nested changed value', (t) => {
  const input = Object.freeze({
    a: {
      b: 'c',
    },
  });
  const actual = setIn(input, Object.freeze(['a', 'b']), 'd');
  const expected = {
    a: {
      b: 'd',
    },
  };
  t.deepEqual(actual, expected);
});

test('setIn with null value, unchanged', (t) => {
  const input = Object.freeze({
    a: {
      b: 0,
    },
  });
  const actual = setIn(input, Object.freeze(['a', 'b']), 0);
  const expected = input;
  t.is(actual, expected);
});

test('merge', (t) => {
  const actual = merge(Object.freeze({}));
  const expected = {};
  t.deepEqual(actual, expected);
  t.not(actual, expected);
});

test('merge multiple', (t) => {
  const actual = merge(Object.freeze({ a: 'b' }), Object.freeze({ c: 'd' }));
  const expected = { a: 'b', c: 'd' };
  t.deepEqual(actual, expected);
});

test('works w normal objects', (t) => {
  const actual = merge({ a: 'b', c: 0 }, { c: 'd' });
  const expected = { a: 'b', c: 'd' };
  t.deepEqual(actual, expected);
});

test('merge w array', (t) => {
  const input = [0, , , 4];
  const actual = merge(input, [1, 2, 3]);
  const expected = [1, 2, 3, 4];
  t.deepEqual(actual, expected);
  t.true(Array.isArray(actual));
});

test('merge unchanged', (t) => {
  const input = { foo: 'bar', hello: 'world' };
  const actual = merge(
    input,
    Object.freeze({ foo: 'bas' }),
    Object.freeze({ foo: 'bar' }),
    Object.freeze({ hello: 'world' }),
  );

  const expected = input;

  t.is(actual, expected);
});

test('merge is shallow', (t) => {
  const input = Object.freeze({ foo: { beep: 'boop' } });
  const change = { foo: { hello: 'world' } };
  const actual = merge(input, change);
  const expected = change;

  t.deepEqual(actual, expected);
  t.not(actual, expected);
});

test('mergeDeep', (t) => {
  const input = Object.freeze({});
  const changes = Object.freeze({
    a: {
      b: {
        c: 'foo',
      },
    },
    d: 'bar',
  });
  const actual = mergeDeep(input, changes);
  const expected = changes;
  t.deepEqual(actual, expected);
});

test('mergeDeep with unchanged array', (t) => {
  const input = Object.freeze({
    a: 'b',
    c: [1, 2, 3],
  });
  const changes = Object.freeze({ a: 'yo' });
  const actual = mergeDeep(input, changes);
  const expected = {
    a: 'yo',
    c: [1, 2, 3],
  };
  t.deepEqual(actual, expected);
  t.is(actual.c, input.c);
});

test('mergeDeep with new unchanged array', (t) => {
  const input = Object.freeze({
    a: 'b',
  });
  const changes = Object.freeze({
    a: 'yo',
    c: [1, 2, 3],
  });
  const actual: { a: string; c: number[] } = mergeDeep(input, changes);
  const expected = {
    a: 'yo',
    c: [1, 2, 3],
  };
  t.deepEqual(actual, expected);
  t.is(actual.c, changes.c);
});

test('mergeDeep two arrays, new array should replace the old one', (t) => {
  const input = Object.freeze({
    a: 'b',
    c: [1, 2, 3],
  });
  const changes = Object.freeze({
    a: 'yo',
    c: [1, 2, 3],
  });
  const actual = mergeDeep(input, changes);
  const expected = {
    a: 'yo',
    c: [1, 2, 3],
  };
  t.deepEqual(actual, expected);
  t.is(actual.c, changes.c);
});

test('mergeDeep with unchanged value', (t) => {
  const input = Object.freeze({
    a: {
      b: 'c',
    },
    beep: 'boop',
  });
  const changes = Object.freeze({
    a: {
      b: 'c',
    },
  });
  const actual = mergeDeep(input, changes);
  const expected = input;
  t.is(actual, expected);
});

test('mergeDeep with unchanged values', (t) => {
  const input = Object.freeze({
    a: {
      b: 'c',
    },
    beep: 'boop',
    foo: 'bar',
  });
  const changes = Object.freeze({
    a: {
      b: 'c',
    },
    beep: 'boop',
  });
  const actual = mergeDeep(input, changes);
  const expected = input;
  t.is(actual, expected);
});

test('mergeDeep with nested changed value', (t) => {
  const input = Object.freeze({
    a: {
      b: 'c',
    },
    foo: 'bar',
  });
  const changes = Object.freeze({
    a: {
      b: 'd',
    },
  });
  const actual = mergeDeep(input, changes);
  
  const expected = {
    a: {
      b: 'd',
    },
    foo: 'bar',
  };
  t.deepEqual(actual, expected);
});

test('mergeDeep with null value, unchanged', (t) => {
  const input = Object.freeze({
    a: {
      b: 0,
    },
    c: false,
  });
  const changes = Object.freeze({
    a: {
      b: 0,
    },
  });
  const actual = mergeDeep(input, changes);
  const expected = input;
  t.is(actual, expected);
});

test('mergeDeep with multiple values changed', (t) => {
  const input = Object.freeze({
    beep: 'boop',
  });
  const changes = Object.freeze({
    foo: 'bar',
    hello: 'world',
  });

  const actual = mergeDeep(input, changes);
  const expected = {
    beep: 'boop',
    foo: 'bar',
    hello: 'world',
  };

  t.deepEqual(actual, expected);
});

test('without()', (t) => {
  const input = Object.freeze({
    a: 'b',
    c: 'd',
  });
  const actual = without(input, 'c');
  const expected = {
    a: 'b',
  };
  t.deepEqual(actual, expected);
});

test('without() that does not change data', (t) => {
  const input = Object.freeze({
    a: 'b',
    c: 'd',
  });
  const actual = without(input, 'not exists');
  const expected = input;
  t.deepEqual(actual, expected);
});

test('without() with falsy value', (t) => {
  const input = Object.freeze({
    foo: null,
  });
  const actual = without(input, 'foo');
  const expected = {};
  t.deepEqual(actual, expected);
});

test('without() with undefined value', (t) => {
  const input = Object.freeze({ foo: undefined });
  const actual = without(input, 'foo');
  const expected = {};
  t.deepEqual(actual, expected);
});

test('without() on array', (t) => {
  const input = Object.freeze([1, 2, 3]);
  const actual = without(input, 1);
  const expected = [1, , 3];

  t.deepEqual(actual, expected);
});

test('map', (t) => {
  const input = { a: 1, b: 2, c: 3, d: 4 };
  const actual = map(input, (num) => num % 2);
  const expected = { a: 1, b: 0, c: 1, d: 0 };
  t.deepEqual(actual, expected);
});

test('map not changed values', (t) => {
  const input = Object.freeze({ a: 1, b: 2, c: 3 });
  const actual = map(input, (num) => num);
  const expected = input;
  t.is(actual, expected);
});

test('map w key', (t) => {
  const input = Object.freeze({ a: 0, b: 1 });
  const actual = map(input, (_val, key) => key);
  const expected = { a: 'a', b: 'b' };
  t.deepEqual(actual, expected);
});

test('map array', (t) => {
  const input = [1, 2, 3, 4];
  const actual = map(input, (num) => num % 2);
  const expected = [1, 0, 1, 0];
  t.deepEqual(actual, expected);
});
