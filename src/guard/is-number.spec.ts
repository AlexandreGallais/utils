import { isNumber } from './is-number.ts';

describe(isNumber, () => {
  it.for([
    [0, true],
    [-1.5, true],
    [Infinity, true],
    [NaN, false],
    ['1', false],
    [null, false],
  ] as const)('checks %s as %s', ([value, expected]) => {
    expect(isNumber(value)).toBe(expected);
  });
});
