/**
 * Builds the list of numbers from `start` (included) to `end` (excluded), by `step`. A negative step
 * counts down. Each value is computed as `start + index * step`: no float error accumulates.
 *
 * @param start - First value.
 * @param end - Bound that is never reached.
 * @param step - Increment between values, non-zero; negative to count down.
 * @returns The values, empty when `step` goes away from `end`.
 * @throws {RangeError} When `step` is `0` or not finite.
 * @example
 * range(0, 5); // [0, 1, 2, 3, 4]
 * range(0, 1, 0.25); // [0, 0.25, 0.5, 0.75]
 * range(5, 0, -2); // [5, 3, 1]
 */
export function range(start: number, end: number, step = 1): number[] {
  if (step === 0 || !Number.isFinite(step)) {
    throw new RangeError(`step must be a non-zero finite number, got ${step}`);
  }
  const length = Math.ceil((end - start) / step);
  const result: number[] = [];
  for (let index = 0; index < length; index++) {
    result.push(start + index * step);
  }
  return result;
}
