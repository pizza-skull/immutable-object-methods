# immutable-object-methods

Update normal plain javascript object, immutable style. Simlar to how immutable.js, seamless-immutable etc does it but a lot smaller and simpler.

## Installation

This is a [Node.js](https://nodejs.org/) module available through the 
[npm registry](https://www.npmjs.com/). It can be installed using the 
[`npm`](https://docs.npmjs.com/getting-started/installing-npm-packages-locally)
or 
[`yarn`](https://yarnpkg.com/en/)
command line tools.

```sh
npm install immutable-object-methods --save
```

## Usage

```js
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


```

## Tests

```sh
npm install
npm test
```

## Dependencies

None

## Dev Dependencies

- [ava](https://ghub.io/ava): Testing can be a drag. AVA helps you get it done.
- [package-json-to-readme](https://ghub.io/package-json-to-readme): Generate a README.md from package.json contents
- [prettier](https://ghub.io/prettier): Prettier is an opinionated code formatter
- [ts-node](https://ghub.io/ts-node): TypeScript execution environment and REPL for node.js, with source map support
- [type-fest](https://ghub.io/type-fest): A collection of essential TypeScript types
- [typescript](https://ghub.io/typescript): TypeScript is a language for application scale JavaScript development

## License

MIT
