import { minOf } from './min-of';

describe(minOf, () => {
  it('finds the smallest value', () => {
    expect(minOf([3, -1, 2])).toBe(-1);
    expect(minOf([7])).toBe(7);
    expect(minOf(new Int32Array([5, 4]))).toBe(4);
    expect(minOf([])).toBeUndefined();
  });

  it('handles lists too long to spread', () => {
    const values = Array.from({ length: 200_000 }, (_, index) => index);
    expect(minOf(values)).toBe(0);
  });
});
