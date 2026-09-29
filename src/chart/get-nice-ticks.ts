/** Margin absorbing floating-point errors when looking for the first and last multiples of the step. */
const TOLERANCE = 1e-9;
/** The base of the powers the steps are multiples of. */
const DECIMAL_BASE = 10;
/** The multipliers of a power of ten that make round steps, before the next power of ten. */
const NICE_FACTORS: readonly number[] = [1, 2, DECIMAL_BASE / 2];

/**
 * Computes round axis graduations covering a data interval, with steps of 1, 2 or 5 times a power of ten
 * (0, 20, 40… rather than 0, 17.3, 34.6…). The ticks stay within the interval.
 *
 * @param min - Start of the interval.
 * @param max - End of the interval.
 * @param count - Approximate number of ticks wanted.
 * @returns The tick values, ascending, without floating-point noise (`0.3`, not `0.30000000000000004`).
 * @throws {RangeError} When `count` is not a positive integer or `min` is greater than `max`.
 * @example
 * getNiceTicks(0, 97, 5); // [0, 20, 40, 60, 80]
 * getNiceTicks(-0.25, 0.25, 5); // [-0.2, -0.1, 0, 0.1, 0.2]
 */
export function getNiceTicks(min: number, max: number, count: number): number[] {
  if (!Number.isSafeInteger(count) || count < 1) {
    throw new RangeError(`count must be a positive integer, got ${count}`);
  }
  if (min > max) {
    throw new RangeError(`min (${min}) must not be greater than max (${max})`);
  }
  if (min === max) {
    return [min];
  }
  const step = getNiceStep((max - min) / count);
  // Dividing integers by the inverse of a step below 1 avoids the noise of multiplying by it.
  const inverse = step < 1 ? Math.round(1 / step) : 1 / step;
  const toValue = step < 1 ? (index: number): number => index / inverse : (index: number): number => index * step;
  const first = Math.ceil(min * inverse - TOLERANCE);
  const last = Math.floor(max * inverse + TOLERANCE);
  return Array.from({ length: last - first + 1 }, (_, offset) => toValue(first + offset) + 0);
}

/**
 * Rounds a raw step up to 1, 2 or 5 times a power of ten.
 *
 * @param rawStep - The interval divided by the number of ticks.
 * @returns The smallest step of 1, 2 or 5 times a power of ten not below the raw step.
 */
function getNiceStep(rawStep: number): number {
  const magnitude = DECIMAL_BASE ** Math.floor(Math.log10(rawStep));
  const residual = rawStep / magnitude;
  const factor = NICE_FACTORS.find((nice) => residual <= nice) ?? DECIMAL_BASE;
  return factor * magnitude;
}
