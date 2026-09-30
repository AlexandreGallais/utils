/**
 * Rounds a number to a number of significant digits, whatever its magnitude.
 *
 * @param value - The number to round.
 * @param digits - The significant digits to keep, from 1 to 100. Defaults to `3`.
 * @returns The rounded number; `NaN` and infinities unchanged.
 * @example
 * roundToSignificantDigits(123_456); // 123000
 * roundToSignificantDigits(0.001_234_5); // 0.00123
 */
export function roundToSignificantDigits(value: number, digits = 3): number {
  return Number.isFinite(value) ? Number(value.toPrecision(digits)) : value;
}
