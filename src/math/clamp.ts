/**
 * Restricts a number to an interval.
 *
 * @param value - The number to restrict.
 * @param min - The lower bound. Defaults to `0`.
 * @param max - The upper bound. Defaults to `1`.
 * @returns `value` within the bounds, or the nearest bound.
 * @example
 * clamp(15, 0, 10); // 10
 * clamp(1.5); // 1
 */
export function clamp(value: number, min = 0, max = 1): number {
  return Math.min(Math.max(value, min), max);
}
