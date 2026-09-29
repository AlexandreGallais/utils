import type { NumberList } from './number-list.ts';

/**
 * Finds the smallest number of a list, in one pass and without spreading it.
 *
 * @param values - An array or a typed array, of any length.
 * @returns The smallest value; `undefined` for an empty list.
 * @example
 * minOf([3, -1, 2]); // -1
 * minOf([]); // undefined
 */
export function minOf(values: NumberList): number | undefined {
  let min: number | undefined;
  for (const value of values) {
    if (min === undefined || value < min) {
      min = value;
    }
  }
  return min;
}
