import { getScaleFactor } from '../internal';

/** From 2^53 on, a double has no fractional part left to round. */
const MAX_EXACT_INTEGER = Number.MAX_SAFE_INTEGER + 1;

/**
 * Rounds a number to a given number of decimals, half away from zero. Gives the same results as
 * `Number(formatDecimal(value, maxFractionDigits))` for values up to 15 significant digits, much faster:
 * plain arithmetic, no string, no `Intl`. Never returns `-0`.
 *
 * @param value - The number to round; `NaN` and infinities are returned unchanged.
 * @param maxFractionDigits - Number of decimals to keep, an integer in [0, 100].
 * @returns The rounded number.
 * @throws {RangeError} When `maxFractionDigits` is not an integer in [0, 100].
 * @example
 * roundToFractionDigits(1.005, 2); // 1.01 (`toFixed` gives 1.00)
 * roundToFractionDigits(-2.5, 0); // -3
 */
export function roundToFractionDigits(value: number, maxFractionDigits: number): number {
  const factor = getScaleFactor(maxFractionDigits);
  const scaled = Math.abs(value) * factor;
  if (!Number.isFinite(scaled) || scaled >= MAX_EXACT_INTEGER) {
    return value + 0;
  }
  // `1 + EPSILON` absorbs the binary representation error: 1.005 is stored as 1.00499999999999989…
  const rounded = Math.round(scaled * (1 + Number.EPSILON)) / factor;
  return rounded !== 0 && value < 0 ? -rounded : rounded;
}
