import { assertValidFractionDigits } from '../internal/assert-valid-fraction-digits.ts';

/**
 * Formatters by number of fraction digits. Creating an `Intl.NumberFormat` costs far more than formatting
 * with it, and simulation UIs format the same few precisions at a high rate.
 */
const decimalFormatters = new Map<number, Intl.NumberFormat>();

/**
 * Formats a number in an invariant format: `.` as decimal separator, no grouping, no trailing zeros, no
 * scientific notation, no `-0`. Rounding is done by ICU on the shortest decimal representation, so
 * `formatDecimal(1.005, 2)` is `'1.01'` (`toFixed` gives `'1.00'`).
 *
 * @param value - The number to format; `NaN` and infinities are formatted like `String(value)`.
 * @param maxFractionDigits - Maximum number of decimals, an integer in [0, 100].
 * @returns The formatted number.
 * @throws {RangeError} When `maxFractionDigits` is not an integer in [0, 100].
 * @example
 * formatDecimal(2, 2); // '2'
 * formatDecimal(1.005, 2); // '1.01'
 * formatDecimal(0.0000001, 8); // '0.0000001'
 * formatDecimal(-0.001, 2); // '0'
 */
export function formatDecimal(value: number, maxFractionDigits: number): string {
  assertValidFractionDigits(maxFractionDigits);
  if (!Number.isFinite(value)) {
    return String(value);
  }

  let formatter = decimalFormatters.get(maxFractionDigits);
  if (!formatter) {
    formatter = new Intl.NumberFormat('en-US', {
      maximumFractionDigits: maxFractionDigits,
      useGrouping: false,
      signDisplay: 'negative',
    });
    decimalFormatters.set(maxFractionDigits, formatter);
  }
  return formatter.format(value);
}
