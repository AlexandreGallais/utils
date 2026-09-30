import { formatDecimal } from './format-decimal';

/**
 * Formats a number with an explicit sign, like `formatDecimal` otherwise: a variation, a trend, a deviation
 * from a setpoint (`'+3.2'`, `'-1.5'`). A value that rounds to zero has no sign.
 *
 * @param value - The number to format; `NaN` stays `'NaN'`.
 * @param maxFractionDigits - Maximum number of decimals, an integer in [0, 100].
 * @returns The formatted number, with `+` before a positive value.
 * @throws {RangeError} When `maxFractionDigits` is not an integer in [0, 100].
 * @example
 * formatSigned(3.21, 1); // '+3.2'
 * formatSigned(-1.5, 1); // '-1.5'
 * formatSigned(0.04, 1); // '0'
 */
export function formatSigned(value: number, maxFractionDigits: number): string {
  const text = formatDecimal(value, maxFractionDigits);
  return text !== '0' && value > 0 ? `+${text}` : text;
}
