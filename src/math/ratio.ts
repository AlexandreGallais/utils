/**
 * Divides a value by a total, without `NaN` or `Infinity`. Not clamped.
 *
 * @param value - The part.
 * @param total - The whole.
 * @returns `value / total`; `0` when `total` is `0`.
 * @example
 * ratio(5, 10); // 0.5
 * ratio(5, 0); // 0
 */
export function ratio(value: number, total: number): number {
  return total === 0 ? 0 : value / total;
}
