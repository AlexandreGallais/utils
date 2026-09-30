import { sum } from './sum';

describe(sum, () => {
  it('adds the values', () => {
    expect(sum([1, 2, 3.5])).toBe(6.5);
    expect(sum(new Float64Array([1, 2]))).toBe(3);
    expect(sum([])).toBe(0);
  });

  it('takes the defaults for null or undefined', () => {
    expect(sum()).toStrictEqual(sum([]));
    expect(sum(null)).toStrictEqual(sum([]));
  });
});
