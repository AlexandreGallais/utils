import { quantile } from './quantile';

describe(quantile, () => {
  it.for([
    [0, 1],
    [0.25, 1.75],
    [0.5, 2.5],
    [1, 4],
  ] as const)('computes the %s quantile', ([q, expected]) => {
    expect(quantile([4, 1, 3, 2], q)).toBe(expected);
  });

  it('handles a single value and typed arrays', () => {
    expect(quantile([7], 0.9)).toBe(7);
    expect(quantile(new Float32Array([1, 3]), 0.5)).toBe(2);
  });

  it('leaves the input untouched', () => {
    const values = [3, 1, 2];
    quantile(values, 0.5);
    expect(values).toStrictEqual([3, 1, 2]);
  });

  it('returns NaN for no value', () => {
    expect(quantile([], 0.5)).toBeNaN();
  });

  it.for([-0.1, 1.1, NaN])('throws a RangeError for q = %s', (q) => {
    expect(() => quantile([1], q)).toThrow(RangeError);
  });

  it('takes the defaults for null or undefined', () => {
    expect(quantile([1, 2, 3, 4])).toStrictEqual(quantile([1, 2, 3, 4], 0.5));
    expect(quantile([1, 2, 3, 4], null)).toStrictEqual(quantile([1, 2, 3, 4], 0.5));
  });
});
