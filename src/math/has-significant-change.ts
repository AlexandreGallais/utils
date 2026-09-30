/** Rounding error tolerated on the difference, in units in the last place of the operands. */
const ROUNDING_ULPS = 4;

/**
 * Tells whether a value moved enough since the last displayed one to be worth an update (a deadband): with
 * values arriving 1 000 times per second, skipping sub-threshold noise saves most renders. A switch between
 * a number and `NaN` always counts.
 *
 * @param previous - The last displayed value.
 * @param next - The new value.
 * @param threshold - Smallest change worth an update, a non-negative number. Defaults to `0`.
 * @returns `true` when `|next - previous| >= threshold` (float rounding tolerated), or when only one of them
 * is `NaN`.
 * @example
 * if (hasSignificantChange(displayedSpeed, speed, 0.1)) {
 *   displayedSpeed = speed;
 *   label.textContent = formatDecimal(speed, 1);
 * }
 */
export function hasSignificantChange(previous: number, next: number, threshold?: number | null): boolean {
  const resolvedThreshold = threshold ?? 0;
  if (Number.isNaN(previous) || Number.isNaN(next)) {
    return Number.isNaN(previous) !== Number.isNaN(next);
  }
  // `10.1 - 10` is 0.09999999999999964: tolerate the rounding error of the subtraction.
  const roundingError = ROUNDING_ULPS * Number.EPSILON * Math.max(Math.abs(previous), Math.abs(next));
  return Math.abs(next - previous) >= resolvedThreshold - roundingError;
}
