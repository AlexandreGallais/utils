/**
 * Checks whether a number lies between two bounds.
 *
 * @param value - The number to check.
 * @param min - The lower bound.
 * @param max - The upper bound.
 * @param isInclusive - Whether the bounds themselves are between. Defaults to `true`.
 * @returns `true` when `value` lies within the bounds.
 * @example
 * isBetween(10, 0, 10); // true
 * isBetween(10, 0, 10, false); // false
 */
export function isBetween(value: number, min: number, max: number, isInclusive = true): boolean {
  return isInclusive ? value >= min && value <= max : value > min && value < max;
}
