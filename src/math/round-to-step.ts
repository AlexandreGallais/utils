import { snapToStep } from './internal/snap-to-step.ts';

/**
 * Rounds a number to the nearest multiple of a step, without float noise: `roundToStep(0.3, 0.1)` is `0.3`,
 * not `0.30000000000000004`.
 *
 * @param value - The number to round.
 * @param step - The step, a positive finite number such as `0.1`, `0.25` or `5`.
 * @returns The nearest multiple of `step`, with no more decimals than `step`.
 * @throws {RangeError} When `step` is not a positive finite number.
 * @example
 * roundToStep(0.29, 0.1); // 0.3
 * roundToStep(8, 5); // 10
 */
export function roundToStep(value: number, step: number): number {
  return snapToStep(value, step, Math.round);
}
