/** Margin absorbing the rounding of `Math.log10` on exact powers of ten. */
const TOLERANCE = 1e-9;

/**
 * Lists the powers of ten within an interval, the main graduations of a logarithmic axis.
 *
 * @param min - Start of the interval, strictly positive.
 * @param max - End of the interval.
 * @returns The powers of ten from `min` to `max`, ascending (`[1, 10, 100]`); empty when none fits.
 * @throws {RangeError} When `min` is not strictly positive or `max` is lower than `min`.
 * @example
 * getLogTicks(0.5, 2000); // [1, 10, 100, 1000]
 */
export function getLogTicks(min: number, max: number): number[] {
  if (!Number.isFinite(min) || !Number.isFinite(max) || min <= 0 || max < min) {
    throw new RangeError(`the interval must be finite and strictly positive, got [${min}, ${max}]`);
  }
  const first = Math.ceil(Math.log10(min) - TOLERANCE);
  const last = Math.floor(Math.log10(max) + TOLERANCE);
  return Array.from({ length: Math.max(last - first + 1, 0) }, (_, index) => toPowerOfTen(first + index));
}

/**
 * Computes a power of ten without the noise of `10 ** -n` (`10 ** -3` is `0.0010000000000000002`).
 *
 * @param exponent - The integer exponent.
 * @returns The exact decimal power of ten.
 */
function toPowerOfTen(exponent: number): number {
  return Number(`1e${exponent}`);
}
