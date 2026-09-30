import { formatNumber } from './format-number';

/**
 * Formats a number like `formatNumber`, in the house format: every digit in a row and a point before the
 * decimals, whatever the language of the page (`1234.50`, never `1,234.50` or `1 234,50`).
 *
 * @param value - The number to format.
 * @param digitsInfo - `'{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}'`, such as `'1.2-2'`.
 * @returns The formatted number.
 * @throws {RangeError} When `digitsInfo` is malformed or outside the `Intl.NumberFormat` limits.
 * @simple Locale fixed to the invariant format: no thousands separator, `.` as decimal separator.
 * @example
 * formatNumberSimple(1234.5, '1.2-2'); // '1234.50'
 * formatNumberSimple(5, '3.0-2'); // '005'
 */
export function formatNumberSimple(value: number, digitsInfo: string): string {
  // `'en-US'` writes `.` before the decimals and `,` only between thousands.
  return formatNumber(value, digitsInfo, 'en-US').replaceAll(',', '');
}
