import { standardDeviation } from './standard-deviation.ts';

describe(standardDeviation, () => {
  it('computes the population and sample standard deviations', () => {
    expect(standardDeviation([2, 4, 4, 4, 5, 5, 7, 9], false)).toBe(2);
    expect(standardDeviation([1, 3], true)).toBeCloseTo(Math.SQRT2, 12);
  });

  it('returns NaN for no value', () => {
    expect(standardDeviation([], false)).toBeNaN();
  });
});
