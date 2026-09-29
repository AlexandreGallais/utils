/** Compact formatters by locale and precision: creating an `Intl.NumberFormat` costs more than using it. */
const compactFormatters = new Map<string, Intl.NumberFormat>();

/**
 * Formats a number in the short form of a locale, for counters and axis labels with little room:
 * `'1.2K'`, `'3.4M'` in English, `'1,2 k'`, `'3,4 M'` in French. Formatters are cached per locale and
 * precision.
 *
 * @param value - The number to format.
 * @param locale - BCP 47 locale, such as `'fr-FR'`.
 * @param maxFractionDigits - Maximum number of decimals of the shortened number, an integer in [0, 20].
 * @returns The compact text.
 * @throws {RangeError} When `maxFractionDigits` is not an integer in [0, 20].
 * @example
 * formatCompact(1234, 'en-US', 1); // '1.2K'
 * formatCompact(15_300_000, 'en-US', 1); // '15.3M'
 * formatCompact(999, 'en-US', 1); // '999'
 */
export function formatCompact(value: number, locale: string, maxFractionDigits: number): string {
  const key = `${locale}|${maxFractionDigits}`;
  let formatter = compactFormatters.get(key);
  if (!formatter) {
    formatter = new Intl.NumberFormat(locale, { notation: 'compact', maximumFractionDigits: maxFractionDigits });
    compactFormatters.set(key, formatter);
  }
  return formatter.format(value);
}
