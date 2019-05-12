export const set = (
  input: Readonly<object>,
  key: Readonly<string | number>,
  value: any,
) => {
  if (input[key] === value) {
    return input;
  }

  const result = Array.isArray(input) ? [] : {};

  for (const inputKey in input) {
    result[inputKey] = inputKey === key ? value : input[inputKey];
  }

  result[key] = value;

  return result;
};
