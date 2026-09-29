/**
 * Restricts a number to an interval. The bounds may be given in any order, which suits inverted scales.
 *
 * @param value - The number to restrict.
 * @param min - One bound of the interval.
 * @param max - The other bound of the interval.
 * @returns `value` when it lies within the bounds, the nearest bound otherwise.
 * @example
 * clamp(15, 0, 10); // 10
 * clamp(5, 10, 0); // 5 (bounds swapped)
 */
export function clamp(value: number, min: number, max: number): number {
  const lower = Math.min(min, max);
  const upper = Math.max(min, max);
  return value < lower ? lower : Math.min(value, upper);
}
