import { chunk } from './chunk.ts';

describe(chunk, () => {
  it('splits into chunks of the given size', () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toStrictEqual([[1, 2], [3, 4], [5]]);
    expect(chunk([1, 2], 5)).toStrictEqual([[1, 2]]);
    expect(chunk([], 3)).toStrictEqual([]);
  });

  it.for([0, -1, 1.5, NaN])('throws a RangeError for size %s', (size) => {
    expect(() => chunk([1], size)).toThrow(RangeError);
  });
});
