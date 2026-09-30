import { pairwise } from './pairwise';

describe(pairwise, () => {
  it('lists the consecutive pairs', () => {
    expect(pairwise([1, 4, 9])).toStrictEqual([
      [1, 4],
      [4, 9],
    ]);
  });

  it('keeps undefined items', () => {
    expect(pairwise([undefined, 1])).toStrictEqual([[undefined, 1]]);
  });

  it('returns no pair for fewer than two items', () => {
    expect(pairwise([1])).toStrictEqual([]);
    expect(pairwise([])).toStrictEqual([]);
  });

  it('takes the defaults for null or undefined', () => {
    expect(pairwise()).toStrictEqual(pairwise([]));
    expect(pairwise(null)).toStrictEqual(pairwise([]));
  });
});
