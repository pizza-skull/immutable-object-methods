import assign from './assign';

const set = (input, key, value) =>
  input[key] === value ? input : assign(input, { [key]: value });

export default set;
