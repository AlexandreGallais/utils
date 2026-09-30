import { snapToStep } from './internal';

/**
 * Rounds a number down to a multiple of a step, without float noise.
 *
 * @param value - The number to round down.
 * @param step - The step, a positive number. Defaults to `1`.
 * @returns The largest multiple of `step` lower than or equal to `value`.
 * @example
 * floorToStep(0.39, 0.1); // 0.3
 * floorToStep(-7, 5); // -10
 */
export function floorToStep(value: number, step = 1): number {
  return snapToStep(value, step, Math.floor);
}
