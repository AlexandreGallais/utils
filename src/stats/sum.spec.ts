import { sum } from './sum.ts';

describe(sum, () => {
  it('adds the values', () => {
    expect(sum([1, 2, 3.5])).toBe(6.5);
    expect(sum(new Float64Array([1, 2]))).toBe(3);
    expect(sum([])).toBe(0);
  });
});
