import { snapToStep } from './internal';

/**
 * Rounds a number up to a multiple of a step, without float noise: `ceilToStep(0.3, 0.1)` is `0.3`, not
 * `0.4`.
 *
 * @param value - The number to round up.
 * @param step - The step, a positive finite number.
 * @returns The smallest multiple of `step` greater than or equal to `value`.
 * @throws {RangeError} When `step` is not a positive finite number.
 * @example
 * ceilToStep(0.31, 0.1); // 0.4
 * ceilToStep(-7, 5); // -5
 */
export function ceilToStep(value: number, step: number): number {
  return snapToStep(value, step, Math.ceil);
}
