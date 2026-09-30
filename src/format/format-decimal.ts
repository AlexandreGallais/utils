const formatters = [new Map<number, Intl.NumberFormat>(), new Map<number, Intl.NumberFormat>()] as const;

/**
 * Formats a number with `.` before the decimals, no trailing zeros, no scientific notation and no `-0`.
 * Rounds like ICU: `formatDecimal(1.005, 2)` is `'1.01'`, where `toFixed` gives `'1.00'`.
 *
 * @param value - The number to format; `NaN` and infinities give `String(value)`.
 * @param maxFractionDigits - The largest number of decimals. Defaults to `3`.
 * @param useGrouping - Whether to separate the thousands with `,`. Defaults to `false`.
 * @returns The formatted number.
 * @example
 * formatDecimal(Math.PI); // '3.142'
 * formatDecimal(2, 2); // '2'
 * formatDecimal(1234.5, 2, true); // '1,234.5'
 * formatDecimal(-0.001, 2); // '0'
 */
export function formatDecimal(value: number, maxFractionDigits = 3, useGrouping = false): string {
  if (!Number.isFinite(value)) {
    return String(value);
  }
  const cache = formatters[useGrouping ? 1 : 0];
  let formatter = cache.get(maxFractionDigits);
  if (!formatter) {
    formatter = new Intl.NumberFormat('en-US', {
      maximumFractionDigits: maxFractionDigits,
      useGrouping,
      signDisplay: 'negative',
    });
    cache.set(maxFractionDigits, formatter);
  }
  return formatter.format(value);
}
