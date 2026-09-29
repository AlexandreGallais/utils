import { clamp } from './clamp.ts';
import { ratio } from './ratio.ts';

/**
 * Divides a value by a total and clamps the result to [0, 1]: a progress or fill level.
 *
 * @param value - The part.
 * @param total - The whole.
 * @returns The ratio in [0, 1]; `0` when `total` is `0`.
 * @example
 * clampedRatio(15, 10); // 1
 * clampedRatio(-5, 10); // 0
 */
export function clampedRatio(value: number, total: number): number {
  return clamp(ratio(value, total), 0, 1);
}
