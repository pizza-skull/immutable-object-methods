const without = (input, key) => {
  if (!key in input) {
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

export default without;
