const assign = require('./assign');
const mergeDeep = require('./merge-deep');
const setIn = require('./set-in');
const getIn = require('./get-in');
const set = require('./set');
const without = require('./without');
const map = require('./map');

const unchainedMethods = {
  assign,
  mergeDeep,
  setIn,
  getIn,
  set,
  without,
  map,
};

const chain = (input) => {
  const methods = map(unchainedMethods, (fn) => (...args) =>
    chain(fn(input, ...args)),
  );

  methods.value = input;

  return methods;
};

module.exports = chain;
