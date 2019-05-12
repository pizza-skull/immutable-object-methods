export const without = (input: object, key: string | number) => {
  if (!(key in input)) {
    return input;
  }

  const result = Array.isArray(input) ? [] : {};

  for (const inputKey in input) {
    if (inputKey !== String(key)) {
      result[inputKey] = input[inputKey];
    }
  }

  return result;
};
