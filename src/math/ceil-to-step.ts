import { snapToStep } from './internal';

/**
 * Rounds a number up to a multiple of a step, without float noise.
 *
 * @param value - The number to round up.
 * @param step - The step, a positive number. Defaults to `1`.
 * @returns The smallest multiple of `step` greater than or equal to `value`.
 * @example
 * ceilToStep(0.31, 0.1); // 0.4
 * ceilToStep(-7, 5); // -5
 */
export function ceilToStep(value: number, step = 1): number {
  return snapToStep(value, step, Math.ceil);
}
