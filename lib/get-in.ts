export const getIn = (
  input: object = {},
  [key, ...rest]: ReadonlyArray<string | number>,
) => {
  if (!input) {
    return undefined;
  }

  return rest[0] ? getIn(input[key], rest) : input[key];
};
