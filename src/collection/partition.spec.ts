import { isString } from '../guard';
import { partition } from './partition';

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

  it('takes the defaults for null or undefined', () => {
    expect(partition(undefined, (item: number) => item > 0)).toStrictEqual(partition([], (item: number) => item > 0));
    expect(partition(null, (item: number) => item > 0)).toStrictEqual(partition([], (item: number) => item > 0));
  });
});
