import type { NumberList } from './number-list.ts';
import { variance } from './variance.ts';

/**
 * Computes the standard deviation of a list of numbers: how far values typically stray from their mean, in
 * the unit of the values. One pass, numerically stable (Welford).
 *
 * @param values - An array or a typed array.
 * @param isSample - `true` for the sample standard deviation (`n - 1`), `false` for the population one (`n`).
 * @returns The standard deviation; `NaN` for an empty list (or a single value with `isSample`).
 * @example
 * standardDeviation([2, 4, 4, 4, 5, 5, 7, 9], false); // 2
 */
export function standardDeviation(values: NumberList, isSample: boolean): number {
  return Math.sqrt(variance(values, isSample));
}
