/**
 * Builds the list of numbers from `start` (included) to `end` (excluded), by `step`. A negative step
 * counts down. Each value is computed as `start + index * step`: no float error accumulates.
 *
 * @param start - First value. Defaults to `0`.
 * @param end - Bound that is never reached.
 * @param step - Increment between values, non-zero; negative to count down. Defaults to `1`.
 * @returns The values, empty when `step` goes away from `end`.
 * @throws {RangeError} When `step` is `0` or not finite.
 * @example
 * range(0, 5, 1); // [0, 1, 2, 3, 4]
 * range(0, 1, 0.25); // [0, 0.25, 0.5, 0.75]
 * range(5, 0, -2); // [5, 3, 1]
 */
export function range(start: number | null | undefined, end: number, step?: number | null): number[] {
  const resolvedStart = start ?? 0;
  const resolvedStep = step ?? 1;
  if (resolvedStep === 0 || !Number.isFinite(resolvedStep)) {
    throw new RangeError(`step must be a non-zero finite number, got ${resolvedStep}`);
  }
  const length = Math.ceil((end - resolvedStart) / resolvedStep);
  const result: number[] = [];
  for (let index = 0; index < length; index++) {
    result.push(resolvedStart + index * resolvedStep);
  }
  return result;
}
