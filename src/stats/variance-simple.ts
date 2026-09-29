import { variance } from './variance.ts';
import type { NumberList } from './number-list.ts';

/**
 * Computes the variance of a whole set of values like `variance`.
 *
 * @param values - The whole population to measure, such as every sample of a run.
 * @returns The variance; `NaN` for an empty list.
 * @simple Population variance (divides by n).
 * @example
 * varianceSimple([2, 4, 4, 4, 5, 5, 7, 9]); // 4
 */
export function varianceSimple(values: NumberList): number {
  return variance(values, false);
}
