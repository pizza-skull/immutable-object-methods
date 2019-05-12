type ReturnType<T, K> = Pick<T, Exclude<keyof T, K>>;

export const without = <T, K extends keyof any>(
  input: T,
  key: K,
): ReturnType<T, K> => {
  if (!(key in input)) {
    return input;
  }

  const result: any = Array.isArray(input) ? [] : {};

  for (const inputKey in input) {
    if (inputKey !== String(key)) {
      result[inputKey] = input[inputKey];
    }
  }

  return result;
};
