const assign = require('./assign');
const mergeDeep = require('./merge-deep');
const setIn = require('./set-in');
const getIn = require('./get-in');
const set = require('./set');
const without = require('./without');
const map = require('./map');
const chain = require('./chain');

Object.assign(module.exports, {
  assign,
  mergeDeep,
  setIn,
  getIn,
  set,
  without,
  map,
  chain,
});
