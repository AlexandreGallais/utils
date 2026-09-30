/**
 * Checks whether a number lies between two bounds.
 *
 * @param value - The number to check.
 * @param min - The lower bound. Defaults to `0`.
 * @param max - The upper bound. Defaults to `1`.
 * @param isInclusive - Whether the bounds themselves are between. Defaults to `true`.
 * @returns `true` when `value` lies within the bounds.
 * @example
 * isBetween(10, 0, 10); // true
 * isBetween(10, 0, 10, false); // false
 */
export function isBetween(value: number, min = 0, max = 1, isInclusive = true): boolean {
  return isInclusive ? value >= min && value <= max : value > min && value < max;
}
