import type { NumberList } from './number-list';
import { quantile } from './quantile';

/** The median is the 50 % quantile. */
const HALF = 0.5;

/**
 * Computes the median of a list of numbers: the middle value, robust to outliers (a sensor spike does not
 * move it, unlike the mean).
 *
 * @param values - An array or a typed array; left untouched.
 * @returns The median (the mean of the two middle values for an even count); `NaN` for an empty list.
 * @example
 * median([1, 3, 2]); // 2
 * median([1, 2, 3, 100]); // 2.5
 */
export function median(values: NumberList): number {
  return quantile(values, HALF);
}
