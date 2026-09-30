/**
 * Checks whether a number lies between two bounds, given in any order.
 *
 * @param value - The number to check.
 * @param min - One bound. Defaults to `0`.
 * @param max - The other bound. Defaults to `1`.
 * @param isInclusive - Whether a value equal to a bound is between them. Defaults to `true`.
 * @returns `true` when `value` lies within the bounds.
 * @example
 * isBetween(10, 0, 10, true); // true
 * isBetween(10, 0, 10, false); // false
 */
export function isBetween(
  value: number,
  min?: number | null,
  max?: number | null,
  isInclusive?: boolean | null,
): boolean {
  const resolvedMin = min ?? 0;
  const resolvedMax = max ?? 1;
  const resolvedIsInclusive = isInclusive ?? true;
  const lower = Math.min(resolvedMin, resolvedMax);
  const upper = Math.max(resolvedMin, resolvedMax);
  return resolvedIsInclusive ? value >= lower && value <= upper : value > lower && value < upper;
}
