import { zip } from './zip';

describe(zip, () => {
  it('pairs the items by position', () => {
    expect(zip(['rpm', 'temperature'], [800, 72])).toStrictEqual([
      ['rpm', 800],
      ['temperature', 72],
    ]);
  });

  it('stops at the shorter list', () => {
    expect(zip([1, 2, 3], ['a'])).toStrictEqual([[1, 'a']]);
    expect(zip([1], ['a', 'b'])).toStrictEqual([[1, 'a']]);
    expect(zip([], ['a'])).toStrictEqual([]);
  });

  it('accepts any iterable', () => {
    expect(zip(new Set([1, 2]), 'ab')).toStrictEqual([
      [1, 'a'],
      [2, 'b'],
    ]);
  });

  it('takes the defaults for null or undefined', () => {
    expect(zip()).toStrictEqual(zip([], []));
    expect(zip(null, null)).toStrictEqual(zip([], []));
  });
});
