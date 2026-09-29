import { variance } from './variance.ts';

const VALUES = [2, 4, 4, 4, 5, 5, 7, 9];

describe(variance, () => {
  it('computes the population variance', () => {
    expect(variance(VALUES, false)).toBe(4);
  });

  it('computes the sample variance', () => {
    expect(variance(VALUES, true)).toBeCloseTo(32 / 7, 12);
  });

  it('stays accurate for large close values', () => {
    expect(variance([1e9 + 4, 1e9 + 7, 1e9 + 13, 1e9 + 16], false)).toBeCloseTo(22.5, 6);
  });

  it('returns NaN without enough values', () => {
    expect(variance([], false)).toBeNaN();
    expect(variance([3], true)).toBeNaN();
    expect(variance([3], false)).toBe(0);
  });
});
