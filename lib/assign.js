import mergeDeep from "./merge-deep";

const assign = (first, ...args) => {
  const changes = {};

  args.forEach(obj => {
    for (const key in obj) {
      changes[key] = obj[key];
    }
  });

  return mergeDeep(first, changes);
}

export default assign;
