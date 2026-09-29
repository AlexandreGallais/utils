import { sortedIndexBy } from './sorted-index-by.ts';

function getTime(item: { readonly time: number }): number {
  return item.time;
}

describe(sortedIndexBy, () => {
  const items = [{ time: 10 }, { time: 20 }, { time: 20 }, { time: 30 }];

  it.for([
    { key: 5, expected: 0 },
    { key: 10, expected: 1 },
    { key: 15, expected: 1 },
    { key: 20, expected: 3 },
    { key: 30, expected: 4 },
    { key: 99, expected: 4 },
  ])('inserts $key at $expected', ({ key, expected }) => {
    expect(sortedIndexBy(items, key, getTime)).toBe(expected);
  });

  it('compares string keys', () => {
    expect(sortedIndexBy(['a', 'c'], 'b', (item) => item)).toBe(1);
  });

  it('returns 0 for an empty list', () => {
    expect(sortedIndexBy([], 1, getTime)).toBe(0);
  });
});
