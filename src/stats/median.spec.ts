import { median } from './median.ts';

describe(median, () => {
  it.for([
    [[1, 3, 2], 2],
    [[1, 2, 3, 100], 2.5],
    [[5], 5],
  ] as const)('computes the median of %j', ([values, expected]) => {
    expect(median(values)).toBe(expected);
  });

  it('returns NaN for no value', () => {
    expect(median([])).toBeNaN();
  });
});
