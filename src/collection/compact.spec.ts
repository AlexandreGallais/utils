import { compact } from './compact';

describe(compact, () => {
  it('removes the falsy values', () => {
    expect(compact(['a', '', undefined, 'b', null])).toStrictEqual(['a', 'b']);
    expect(compact([0, 1, NaN, 2, 0n, false, true])).toStrictEqual([1, 2, true]);
  });

  it('types the result without the falsy values', () => {
    expectTypeOf(compact(['a', undefined])).toEqualTypeOf<string[]>();
  });

  it('takes the defaults for null or undefined', () => {
    expect(compact()).toStrictEqual(compact([]));
    expect(compact(null)).toStrictEqual(compact([]));
  });
});
