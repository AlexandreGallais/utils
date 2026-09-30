import { hasSignificantChange } from './has-significant-change';

describe(hasSignificantChange, () => {
  it.for([
    [10, 10.05, 0.1, false],
    [10, 10.1, 0.1, true],
    [1000, 1000.1, 0.1, true],
    [10, 10.099, 0.1, false],
    [10, 9.8, 0.1, true],
    [10, 10, 0, true],
    [NaN, 10, 0.1, true],
    [10, NaN, 0.1, true],
    [NaN, NaN, 0.1, false],
  ] as const)('compares %s → %s with threshold %s: %s', ([previous, next, threshold, expected]) => {
    expect(hasSignificantChange(previous, next, threshold)).toBe(expected);
  });
});
