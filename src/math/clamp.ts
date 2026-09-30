/**
 * Restricts a number to an interval. The bounds may be given in any order, which suits inverted scales.
 *
 * @param value - The number to restrict.
 * @param min - One bound of the interval. Defaults to `0`.
 * @param max - The other bound of the interval. Defaults to `1`.
 * @returns `value` when it lies within the bounds, the nearest bound otherwise.
 * @example
 * clamp(15, 0, 10); // 10
 * clamp(5, 10, 0); // 5 (bounds swapped)
 */
export function clamp(value: number, min?: number | null, max?: number | null): number {
  const resolvedMin = min ?? 0;
  const resolvedMax = max ?? 1;
  const lower = Math.min(resolvedMin, resolvedMax);
  const upper = Math.max(resolvedMin, resolvedMax);
  return value < lower ? lower : Math.min(value, upper);
}
