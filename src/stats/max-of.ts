import type { NumberList } from './number-list';

/**
 * Finds the largest number of a list, in one pass and without spreading it.
 *
 * @param values - An array or a typed array, of any length.
 * @returns The largest value; `undefined` for an empty list.
 * @example
 * maxOf([3, -1, 2]); // 3
 * maxOf([]); // undefined
 */
export function maxOf(values: NumberList): number | undefined {
  let max: number | undefined;
  for (const value of values) {
    if (max === undefined || value > max) {
      max = value;
    }
  }
  return max;
}
