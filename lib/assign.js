// @ts-check

const set = require('./set');

/**
 * 
 * @param {Object} input 
 * @param  {...Object} args 
 */
const assign = (input, ...args) => {
  const changes = {};

  args.forEach((obj) => {
    for (const key in obj) {
      changes[key] = obj[key];
    }
  });

  let result = input;

  for (const key in changes) {
    result = set(result, key, changes[key]);
  }

  return result;

};

module.exports = assign;
