import { isArrayOf } from './is-array-of.ts';
import { isNumber } from './is-number.ts';
import { isString } from './is-string.ts';

describe(isArrayOf, () => {
  it('checks every item', () => {
    expect(isArrayOf([1, 2], isNumber)).toBe(true);
    expect(isArrayOf([], isNumber)).toBe(true);
    expect(isArrayOf([1, '2'], isNumber)).toBe(false);
    expect(isArrayOf('12', isString)).toBe(false);
  });
});
