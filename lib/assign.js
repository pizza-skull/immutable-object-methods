// @ts-check

const mergeDeep = require('./merge-deep');

/**
 * 
 * @param {Object} first 
 * @param  {...Object} args 
 */
const assign = (first, ...args) => {
  const changes = {};

  args.forEach((obj) => {
    for (const key in obj) {
      changes[key] = obj[key];
    }
  });

  return mergeDeep(first, changes);
};

module.exports = assign;
