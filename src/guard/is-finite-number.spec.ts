import { isFiniteNumber } from './is-finite-number.ts';

describe(isFiniteNumber, () => {
  it.for([
    [0, true],
    [-1.5, true],
    [Infinity, false],
    [NaN, false],
    ['1', false],
  ] as const)('checks %s as %s', ([value, expected]) => {
    expect(isFiniteNumber(value)).toBe(expected);
  });
});
