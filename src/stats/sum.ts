import type { NumberList } from './number-list.ts';

/**
 * Adds up a list of numbers.
 *
 * @param values - An array or a typed array.
 * @returns The sum; `0` for an empty list.
 * @example
 * sum([1, 2, 3.5]); // 6.5
 * sum(new Float64Array([1, 2])); // 3
 */
export function sum(values: NumberList): number {
  let total = 0;
  for (const value of values) {
    total += value;
  }
  return total;
}
