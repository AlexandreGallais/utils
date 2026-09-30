import type { NumberList } from './number-list';

/** Quantile when none is given: the median. */
const DEFAULT_Q = 0.5;

/**
 * Computes a quantile (percentile) of a list of numbers, with linear interpolation between the two nearest
 * ranks (the default method of spreadsheets and NumPy). Sorts a typed copy: O(n log n).
 *
 * @param values - An array or a typed array; left untouched.
 * @param q - The quantile, in [0, 1]: `0.5` is the median, `0.95` the 95th percentile. Defaults to `0.5`.
 * @returns The quantile; `NaN` for an empty list.
 * @throws {RangeError} When `q` is not in [0, 1].
 * @example
 * quantile([1, 2, 3, 4], 0.5); // 2.5
 * quantile(responseTimes, 0.95); // 95th percentile
 */
export function quantile(values: NumberList, q?: number | null): number {
  const resolvedQ = q ?? DEFAULT_Q;
  if (!(resolvedQ >= 0 && resolvedQ <= 1)) {
    throw new RangeError(`q must be in [0, 1], got ${resolvedQ}`);
  }
  if (values.length === 0) {
    return NaN;
  }
  // A typed array sorts numerically without a comparator.
  const sorted = Float64Array.from(values).toSorted();
  const rank = (sorted.length - 1) * resolvedQ;
  const lower = Math.floor(rank);
  const [below = NaN, above = below] = sorted.subarray(lower, lower + 2);
  return below + (above - below) * (rank - lower);
}
