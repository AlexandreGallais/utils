import { moveItem } from './move-item.ts';

describe(moveItem, () => {
  it.for([
    { from: 0, to: 2, expected: ['b', 'c', 'a', 'd'] },
    { from: 3, to: 0, expected: ['d', 'a', 'b', 'c'] },
    { from: 1, to: 1, expected: ['a', 'b', 'c', 'd'] },
    { from: 0, to: 3, expected: ['b', 'c', 'd', 'a'] },
  ])('moves $from to $to', ({ from, to, expected }) => {
    const items = ['a', 'b', 'c', 'd'];
    expect(moveItem(items, from, to)).toStrictEqual(expected);
    expect(items).toStrictEqual(['a', 'b', 'c', 'd']);
  });

  it.for([
    [-1, 0],
    [0, 4],
    [1.5, 0],
  ])('throws a RangeError for %s → %s', ([from = 0, to = 0]) => {
    expect(() => moveItem(['a', 'b', 'c', 'd'], from, to)).toThrow(RangeError);
  });
});
