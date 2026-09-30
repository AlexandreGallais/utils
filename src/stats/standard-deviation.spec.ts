import { standardDeviation } from './standard-deviation';

describe(standardDeviation, () => {
  it('computes the population and sample standard deviations', () => {
    expect(standardDeviation([2, 4, 4, 4, 5, 5, 7, 9], false)).toBe(2);
    expect(standardDeviation([1, 3], true)).toBeCloseTo(Math.SQRT2, 12);
  });

  it('returns NaN for no value', () => {
    expect(standardDeviation([], false)).toBeNaN();
  });

  it('takes the defaults for null or undefined', () => {
    expect(standardDeviation([1, 2, 3, 4])).toStrictEqual(standardDeviation([1, 2, 3, 4], false));
    expect(standardDeviation([1, 2, 3, 4], null)).toStrictEqual(standardDeviation([1, 2, 3, 4], false));
  });
});
