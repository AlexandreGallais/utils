import type { NumberList } from './number-list';
import { sum } from './sum';

/**
 * Computes the arithmetic mean of a list of numbers.
 *
 * @param values - An array or a typed array.
 * @returns The mean; `NaN` for an empty list.
 * @example
 * mean([1, 2, 3, 4]); // 2.5
 */
export function mean(values: NumberList): number {
  return values.length === 0 ? NaN : sum(values) / values.length;
}
