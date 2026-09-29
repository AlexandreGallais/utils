/**
 * Checks whether a number lies between two bounds, given in any order.
 *
 * @param value - The number to check.
 * @param min - One bound.
 * @param max - The other bound.
 * @param isInclusive - Whether a value equal to a bound is between them.
 * @returns `true` when `value` lies within the bounds.
 * @example
 * isBetween(10, 0, 10); // true
 * isBetween(10, 0, 10, false); // false
 */
export function isBetween(value: number, min: number, max: number, isInclusive = true): boolean {
  const lower = Math.min(min, max);
  const upper = Math.max(min, max);
  return isInclusive ? value >= lower && value <= upper : value > lower && value < upper;
}
