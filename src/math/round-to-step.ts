import { snapToStep } from './internal';

/**
 * Rounds a number to the nearest multiple of a step, without float noise: `roundToStep(0.3, 0.1)` is `0.3`.
 *
 * @param value - The number to round.
 * @param step - The step, a positive number such as `0.1`, `0.25` or `5`. Defaults to `1`.
 * @returns The nearest multiple of `step`, with no more decimals than `step`.
 * @example
 * roundToStep(0.29, 0.1); // 0.3
 * roundToStep(8, 5); // 10
 */
export function roundToStep(value: number, step = 1): number {
  return snapToStep(value, step, Math.round);
}
