const getIn = (input = {}, [key, ...rest]) => {
  if (!input) {
    return undefined;
  }

  return rest.length ? getIn(input[key], rest) : input[key];
};

module.exports = getIn;
