// @ts-check

/**
 *
 * @param {Object} input
 * @param {(string|number)[]} param1
 */
const getIn = (input = {}, [key, ...rest]) => {
  if (!input) {
    return undefined;
  }

  return rest[0] ? getIn(input[key], rest) : input[key];
};

module.exports = getIn;
