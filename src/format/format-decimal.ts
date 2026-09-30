import { assertValidFractionDigits } from '../internal';

/** Maximum number of decimals when none is given. */
const DEFAULT_MAX_FRACTION_DIGITS = 3;

/**
 * Formatters by number of fraction digits, without then with grouping. Creating an `Intl.NumberFormat` costs far
 * more than formatting with it, and simulation UIs format the same few precisions at a high rate.
 */
const decimalFormatters = [new Map<number, Intl.NumberFormat>(), new Map<number, Intl.NumberFormat>()] as const;

/**
 * Formats a number in an invariant format: `.` as decimal separator, no trailing zeros, no scientific notation,
 * no `-0`, and no grouping unless asked (`,` between thousands). Rounding is done by ICU on the shortest decimal
 * representation, so `formatDecimal(1.005, 2)` is `'1.01'` (`toFixed` gives `'1.00'`).
 *
 * @param value - The number to format; `NaN` and infinities are formatted like `String(value)`.
 * @param maxFractionDigits - Maximum number of decimals, an integer in [0, 100]. Defaults to `3`.
 * @param useGrouping - Whether to separate the thousands with `,` (`1,234.5`). Defaults to `false`.
 * @returns The formatted number.
 * @throws {RangeError} When `maxFractionDigits` is not an integer in [0, 100].
 * @example
 * formatDecimal(Math.PI); // '3.142'
 * formatDecimal(2, 2); // '2'
 * formatDecimal(1.005, 2); // '1.01'
 * formatDecimal(1234.5, 2, true); // '1,234.5'
 * formatDecimal(-0.001, 2); // '0'
 */
export function formatDecimal(value: number, maxFractionDigits?: number | null, useGrouping?: boolean | null): string {
  const resolvedMaxFractionDigits = maxFractionDigits ?? DEFAULT_MAX_FRACTION_DIGITS;
  const resolvedUseGrouping = useGrouping ?? false;
  assertValidFractionDigits(resolvedMaxFractionDigits);
  if (!Number.isFinite(value)) {
    return String(value);
  }

  const formatters = decimalFormatters[resolvedUseGrouping ? 1 : 0];
  let formatter = formatters.get(resolvedMaxFractionDigits);
  if (!formatter) {
    formatter = new Intl.NumberFormat('en-US', {
      maximumFractionDigits: resolvedMaxFractionDigits,
      useGrouping: resolvedUseGrouping,
      signDisplay: 'negative',
    });
    formatters.set(resolvedMaxFractionDigits, formatter);
  }
  return formatter.format(value);
}
