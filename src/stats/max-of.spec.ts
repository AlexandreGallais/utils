import { maxOf } from './max-of';

describe(maxOf, () => {
  it('finds the largest value', () => {
    expect(maxOf([3, -1, 2])).toBe(3);
    expect(maxOf([7])).toBe(7);
    expect(maxOf([])).toBeUndefined();
  });

  it('handles lists too long to spread', () => {
    const values = Array.from({ length: 200_000 }, (_, index) => index);
    expect(maxOf(values)).toBe(199_999);
  });
});
