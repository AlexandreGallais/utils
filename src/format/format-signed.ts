import { formatDecimal } from './format-decimal';

/** Maximum number of decimals when none is given. */
const DEFAULT_MAX_FRACTION_DIGITS = 3;

/**
 * Formats a number with an explicit sign, like `formatDecimal` otherwise: a variation, a trend, a deviation
 * from a setpoint (`'+3.2'`, `'-1.5'`). A value that rounds to zero has no sign.
 *
 * @param value - The number to format; `NaN` stays `'NaN'`.
 * @param maxFractionDigits - Maximum number of decimals, an integer in [0, 100]. Defaults to `3`.
 * @returns The formatted number, with `+` before a positive value.
 * @throws {RangeError} When `maxFractionDigits` is not an integer in [0, 100].
 * @example
 * formatSigned(3.21, 1); // '+3.2'
 * formatSigned(-1.5, 1); // '-1.5'
 * formatSigned(0.04, 1); // '0'
 */
export function formatSigned(value: number, maxFractionDigits?: number | null): string {
  const resolvedMaxFractionDigits = maxFractionDigits ?? DEFAULT_MAX_FRACTION_DIGITS;
  const text = formatDecimal(value, resolvedMaxFractionDigits);
  return text !== '0' && value > 0 ? `+${text}` : text;
}
