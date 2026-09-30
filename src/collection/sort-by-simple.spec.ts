import { sortBySimple } from './sort-by-simple';

describe(sortBySimple, () => {
  it('sorts in ascending order', () => {
    expect(sortBySimple([3, 1, 2], (value) => value)).toStrictEqual([1, 2, 3]);
  });
});
