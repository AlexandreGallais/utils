import { createLogScale } from './create-log-scale';

describe(createLogScale, () => {
  it('gives each power of ten the same length', () => {
    const x = createLogScale([1, 1000], [0, 300]);
    expect(x(1)).toBe(0);
    expect(x(10)).toBe(100);
    expect(x(1000)).toBe(300);
    expect(x(0)).toBe(-Infinity);
    expect(x(-5)).toBeNaN();
  });

  it('inverts coordinates', () => {
    const y = createLogScale([1, 10_000], [400, 0]);
    expect(y.invert(200)).toBeCloseTo(100, 10);
    expect(y.domain).toStrictEqual([1, 10_000]);
    expect(y.range).toStrictEqual([400, 0]);
  });

  it('maps an empty domain or range to its start', () => {
    expect(createLogScale([5, 5], [0, 100])(50)).toBe(0);
    expect(createLogScale([1, 10], [7, 7]).invert(3)).toBe(1);
  });

  it.for([0, -1, Infinity, NaN])('throws a RangeError for a domain end of %s', (end) => {
    expect(() => createLogScale([1, end], [0, 1])).toThrow(RangeError);
  });
});
