/**
 * Checks whether a value moved enough since the displayed one to be worth a render (a deadband). A switch
 * between a number and `NaN` always counts.
 *
 * @param previous - The displayed value.
 * @param next - The new value.
 * @param threshold - The smallest change worth a render. Defaults to `0`.
 * @returns `true` when `|next - previous| >= threshold`.
 * @example
 * hasSignificantChange(10, 10.5, 0.1); // true
 * hasSignificantChange(10, 10.05, 0.1); // false
 */
export function hasSignificantChange(previous: number, next: number, threshold = 0): boolean {
  return Math.abs(next - previous) >= threshold || Number.isNaN(previous) !== Number.isNaN(next);
}
