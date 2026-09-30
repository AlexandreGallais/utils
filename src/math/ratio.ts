import { inverseLerp } from './inverse-lerp';

/**
 * Divides a value by a total, safely: the same as `inverseLerp(0, total, value)`. Not clamped.
 *
 * @param value - The part.
 * @param total - The whole.
 * @returns `value / total`, or `0` when `total` is `0` (never `NaN` or `Infinity`).
 * @example
 * ratio(5, 10); // 0.5
 * ratio(5, 0); // 0
 */
export function ratio(value: number, total: number): number {
  return inverseLerp(0, total, value);
}
