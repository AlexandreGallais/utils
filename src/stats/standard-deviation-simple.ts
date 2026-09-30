import { standardDeviation } from './standard-deviation';
import type { NumberList } from './number-list';

/**
 * Computes the standard deviation of a whole set of values like `standardDeviation`.
 *
 * @param values - The whole population to measure, such as every sample of a run.
 * @returns The standard deviation; `NaN` for an empty list.
 * @simple Population standard deviation (divides by n).
 * @example
 * standardDeviationSimple([2, 4, 4, 4, 5, 5, 7, 9]); // 2
 */
export function standardDeviationSimple(values: NumberList): number {
  return standardDeviation(values, false);
}
