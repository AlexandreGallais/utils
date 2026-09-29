/** Highest precision accepted by `Number.prototype.toPrecision`. */
const MAX_DIGITS = 100;

/**
 * Rounds a number to a number of significant digits, whatever its magnitude: `0.0012345` and `12345` both
 * keep three meaningful digits with `3`. For values of very different scales in the same table.
 *
 * @param value - The number to round.
 * @param digits - Significant digits to keep, an integer in [1, 100].
 * @returns The rounded number, without floating-point noise; `0`, `NaN` and infinities unchanged.
 * @throws {RangeError} When `digits` is not an integer in [1, 100].
 * @example
 * roundToSignificantDigits(123_456, 3); // 123000
 * roundToSignificantDigits(0.001_234_5, 3); // 0.00123
 */
export function roundToSignificantDigits(value: number, digits: number): number {
  if (!Number.isSafeInteger(digits) || digits < 1 || digits > MAX_DIGITS) {
    throw new RangeError(`digits must be an integer in [1, ${MAX_DIGITS}], got ${digits}`);
  }
  return Number.isFinite(value) ? Number(value.toPrecision(digits)) : value;
}
