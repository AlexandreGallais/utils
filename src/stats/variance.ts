import type { NumberList } from './number-list.ts';

/**
 * Computes the variance of a list of numbers in one pass with Welford's algorithm, numerically stable even
 * for large values close to each other (unlike the textbook `mean(x²) - mean(x)²`).
 *
 * @param values - An array or a typed array.
 * @param isSample - `true` for the sample variance (divides by `n - 1`), `false` for the population variance
 * (divides by `n`).
 * @returns The variance; `NaN` for an empty list (or a single value with `isSample`).
 * @example
 * variance([2, 4, 4, 4, 5, 5, 7, 9], false); // 4
 * variance([2, 4, 4, 4, 5, 5, 7, 9], true); // 4.571…
 */
export function variance(values: NumberList, isSample: boolean): number {
  let count = 0;
  let mean = 0;
  let squaredDeviations = 0;
  for (const value of values) {
    count += 1;
    const delta = value - mean;
    mean += delta / count;
    squaredDeviations += delta * (value - mean);
  }
  const divisor = isSample ? count - 1 : count;
  return divisor > 0 ? squaredDeviations / divisor : NaN;
}
