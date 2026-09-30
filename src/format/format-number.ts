const DIGITS_INFO_PATTERN = /^(?<minInteger>\d+)\.(?<minFraction>\d+)-(?<maxFraction>\d+)$/v;

const formatters = [
  new Map<string, Map<string, Intl.NumberFormat>>(),
  new Map<string, Map<string, Intl.NumberFormat>>(),
] as const;

/**
 * Formats a number like Angular's `DecimalPipe`: digits driven by `digitsInfo`, separators of a locale.
 * `NaN`, infinities and `-0` are handled like `formatDecimal`.
 *
 * @param value - The number to format.
 * @param digitsInfo - `'{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}'`, such as `'1.0-2'`.
 * Defaults to `'1.0-3'`.
 * @param locale - The BCP 47 locale, such as `'fr-FR'`. Defaults to `'en-US'`.
 * @param useGrouping - Whether to separate the thousands. Defaults to `false`.
 * @returns The formatted number.
 * @throws {TypeError} When `digitsInfo` does not look like `'1.0-3'`.
 * @example
 * formatNumber(1234.5678); // '1234.568'
 * formatNumber(5, '3.0-2'); // '005'
 * formatNumber(1234.5, '1.2-2', 'en-US', true); // '1,234.50'
 * formatNumber(1234.5, '1.2-2', 'de-DE', true); // '1.234,50'
 */
export function formatNumber(value: number, digitsInfo = '1.0-3', locale = 'en-US', useGrouping = false): string {
  if (!Number.isFinite(value)) {
    return String(value);
  }
  const cache = formatters[useGrouping ? 1 : 0];
  let localeFormatters = cache.get(locale);
  if (!localeFormatters) {
    localeFormatters = new Map();
    cache.set(locale, localeFormatters);
  }
  let formatter = localeFormatters.get(digitsInfo);
  if (!formatter) {
    formatter = createFormatter(digitsInfo, locale, useGrouping);
    localeFormatters.set(digitsInfo, formatter);
  }
  return formatter.format(value);
}

function createFormatter(digitsInfo: string, locale: string, useGrouping: boolean): Intl.NumberFormat {
  const groups = DIGITS_INFO_PATTERN.exec(digitsInfo)?.groups;
  if (!groups) {
    throw new TypeError(`digitsInfo must look like '1.0-3', got '${digitsInfo}'`);
  }
  return new Intl.NumberFormat(locale, {
    minimumIntegerDigits: Number(groups['minInteger']),
    minimumFractionDigits: Number(groups['minFraction']),
    maximumFractionDigits: Number(groups['maxFraction']),
    useGrouping,
    signDisplay: 'negative',
  });
}
