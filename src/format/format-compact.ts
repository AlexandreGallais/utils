/** Locale when none is given. */
const DEFAULT_LOCALE = 'en-US';

/** Compact formatters by locale and precision: creating an `Intl.NumberFormat` costs more than using it. */
const compactFormatters = new Map<string, Intl.NumberFormat>();

/**
 * Formats a number in the short form of a locale, for counters and axis labels with little room:
 * `'1.2K'`, `'3.4M'` in English, `'1,2 k'`, `'3,4 M'` in French. Formatters are cached per locale and
 * precision.
 *
 * @param value - The number to format.
 * @param locale - BCP 47 locale, such as `'fr-FR'`. Defaults to `'en-US'`.
 * @param maxFractionDigits - Maximum number of decimals of the shortened number, an integer in [0, 20]. Defaults to
 * `1`.
 * @returns The compact text.
 * @throws {RangeError} When `maxFractionDigits` is not an integer in [0, 20].
 * @example
 * formatCompact(1234, 'en-US', 1); // '1.2K'
 * formatCompact(15_300_000, 'en-US', 1); // '15.3M'
 * formatCompact(999, 'en-US', 1); // '999'
 */
export function formatCompact(value: number, locale?: string | null, maxFractionDigits?: number | null): string {
  const resolvedLocale = locale ?? DEFAULT_LOCALE;
  const resolvedMaxFractionDigits = maxFractionDigits ?? 1;
  const key = `${resolvedLocale}|${resolvedMaxFractionDigits}`;
  let formatter = compactFormatters.get(key);
  if (!formatter) {
    formatter = new Intl.NumberFormat(resolvedLocale, {
      notation: 'compact',
      maximumFractionDigits: resolvedMaxFractionDigits,
    });
    compactFormatters.set(key, formatter);
  }
  return formatter.format(value);
}
