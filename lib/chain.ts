import { assign } from './assign';
import { getIn } from './get-in';
import { map } from './map';
import { mergeDeep } from './merge-deep';
import { set } from './set';
import { setIn } from './set-in';
import { without } from './without';

class Chain {
  constructor(public value) {}

  private wrap(fn) {
    return (...args) => {
      return new Chain(fn(this.value, ...args));
    };
  }

  assign = this.wrap(assign);
  getIn = this.wrap(getIn);
  map = this.wrap(map);
  mergeDeep = this.wrap(mergeDeep);
  set = this.wrap(set);
  setIn = this.wrap(setIn);
  without = this.wrap(without);
}

export const chain = (value) => {
  return new Chain(value);
};
