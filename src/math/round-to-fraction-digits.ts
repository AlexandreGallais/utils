import { getScaleFactor } from '../internal';

const MAX_EXACT_INTEGER = Number.MAX_SAFE_INTEGER + 1;

/**
 * Rounds a number to a number of decimals, half away from zero, with plain arithmetic: the same result as
 * `Number(formatDecimal(value, maxFractionDigits))`, much faster. Never returns `-0`.
 *
 * @param value - The number to round; `NaN` and infinities come back unchanged.
 * @param maxFractionDigits - The number of decimals to keep. Defaults to `3`.
 * @returns The rounded number.
 * @example
 * roundToFractionDigits(1.005, 2); // 1.01 (`toFixed` gives 1.00)
 * roundToFractionDigits(-2.5, 0); // -3
 */
export function roundToFractionDigits(value: number, maxFractionDigits = 3): number {
  const factor = getScaleFactor(maxFractionDigits);
  const scaled = Math.abs(value) * factor;
  if (!Number.isFinite(scaled) || scaled >= MAX_EXACT_INTEGER) {
    return value + 0;
  }
  // `1 + EPSILON` absorbs the binary error: 1.005 is stored as 1.00499999999999989…
  const rounded = Math.round(scaled * (1 + Number.EPSILON)) / factor;
  return rounded !== 0 && value < 0 ? -rounded : rounded;
}
