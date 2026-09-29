import { isString } from '../guard/is-string.ts';
import { partition } from './partition.ts';

describe(partition, () => {
  it('splits the items in one pass', () => {
    expect(partition([1, 2, 3, 4], (value) => value % 2 === 0)).toStrictEqual([
      [2, 4],
      [1, 3],
    ]);
  });

  it('narrows both sides with a type guard', () => {
    const [strings, numbers] = partition(['a', 1, 'b', 2], isString);
    expectTypeOf(numbers).toEqualTypeOf<number[]>();
    expect(strings).toStrictEqual(['a', 'b']);
    expect(numbers).toStrictEqual([1, 2]);
  });
});
