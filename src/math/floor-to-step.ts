import { snapToStep } from './internal';

/**
 * Rounds a number down to a multiple of a step, without float noise: `floorToStep(0.3, 0.1)` is `0.3`, not
 * `0.2`.
 *
 * @param value - The number to round down.
 * @param step - The step, a positive finite number. Defaults to `1`.
 * @returns The largest multiple of `step` lower than or equal to `value`.
 * @throws {RangeError} When `step` is not a positive finite number.
 * @example
 * floorToStep(0.39, 0.1); // 0.3
 * floorToStep(-7, 5); // -10
 */
export function floorToStep(value: number, step?: number | null): number {
  const resolvedStep = step ?? 1;
  return snapToStep(value, resolvedStep, Math.floor);
}
