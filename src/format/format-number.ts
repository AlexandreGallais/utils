import { assertValidFractionDigits } from '../internal';

/** Angular `DecimalPipe` defaults when a part of `digitsInfo` is omitted. */
const DEFAULT_MIN_INTEGER_DIGITS = 1;
const DEFAULT_MIN_FRACTION_DIGITS = 0;
const DEFAULT_MAX_FRACTION_DIGITS = 3;

/** Highest value accepted by `Intl.NumberFormat` for `minimumIntegerDigits`. */
const MAX_INTEGER_DIGITS = 21;

/** `{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}`, every part optional. */
const DIGITS_INFO_PATTERN = /^(?<minInteger>\d+)?\.(?:(?<minFraction>\d+)(?:-(?<maxFraction>\d+))?)?$/v;

/** Formatters by locale, then by `digitsInfo`: nested maps, so no key string is built at each call. */
const numberFormatters = new Map<string, Map<string, Intl.NumberFormat>>();

/**
 * Formats a number with digits driven by `digitsInfo` and the separators of a locale, like Angular's
 * `DecimalPipe` (`1,234.5` in `'en-US'`, `1 234,5` in `'fr-FR'`). For an invariant text without grouping,
 * use `formatDecimal`. `NaN`, infinities and `-0` are handled like `formatDecimal`. Formatters are cached
 * per locale and `digitsInfo`.
 *
 * @param value - The number to format.
 * @param digitsInfo - `'{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}'`, each part optional
 * (defaults `1.0-3`), such as `'1.0-2'` or `'3.2-4'`.
 * @param locale - BCP 47 locale of the separators and grouping, such as `'en-US'`.
 * @returns The formatted number.
 * @throws {RangeError} When `digitsInfo` is malformed or outside the `Intl.NumberFormat` limits.
 * @example
 * formatNumber(Math.PI, '1.0-2', 'en-US'); // '3.14'
 * formatNumber(5, '3.0-2', 'en-US'); // '005'
 * formatNumber(1234.5, '1.2-2', 'en-US'); // '1,234.50'
 * formatNumber(1234.5, '1.2-2', 'de-DE'); // '1.234,50'
 */
export function formatNumber(value: number, digitsInfo: string, locale: string): string {
  let localeFormatters = numberFormatters.get(locale);
  if (!localeFormatters) {
    localeFormatters = new Map();
    numberFormatters.set(locale, localeFormatters);
  }

  let formatter = localeFormatters.get(digitsInfo);
  if (!formatter) {
    formatter = createNumberFormatter(digitsInfo, locale);
    localeFormatters.set(digitsInfo, formatter);
  }
  return Number.isFinite(value) ? formatter.format(value) : String(value);
}

/**
 * Parses `digitsInfo` and creates the matching formatter.
 *
 * @param digitsInfo - The digits specification.
 * @param locale - BCP 47 locale, such as `'en-US'` or `'fr-FR'`.
 * @returns A new formatter.
 * @throws {RangeError} When `digitsInfo` is malformed or outside the `Intl.NumberFormat` limits.
 */
function createNumberFormatter(digitsInfo: string, locale: string): Intl.NumberFormat {
  const groups = DIGITS_INFO_PATTERN.exec(digitsInfo)?.groups;
  if (!groups) {
    throw new RangeError(`digitsInfo must look like '1.0-2' (integer.minFraction-maxFraction), got '${digitsInfo}'`);
  }

  const minIntegerDigits = parseDigits(groups['minInteger'], DEFAULT_MIN_INTEGER_DIGITS);
  if (minIntegerDigits < 1 || minIntegerDigits > MAX_INTEGER_DIGITS) {
    throw new RangeError(`minIntegerDigits must be in [1, ${MAX_INTEGER_DIGITS}], got ${minIntegerDigits}`);
  }
  const minFractionDigits = parseDigits(groups['minFraction'], DEFAULT_MIN_FRACTION_DIGITS);
  const maxFractionDigits = parseDigits(
    groups['maxFraction'],
    Math.max(minFractionDigits, DEFAULT_MAX_FRACTION_DIGITS),
  );
  assertValidFractionDigits(maxFractionDigits);
  if (minFractionDigits > maxFractionDigits) {
    throw new RangeError(
      `minFractionDigits (${minFractionDigits}) must not exceed maxFractionDigits (${maxFractionDigits})`,
    );
  }

  return new Intl.NumberFormat(locale, {
    minimumIntegerDigits: minIntegerDigits,
    minimumFractionDigits: minFractionDigits,
    maximumFractionDigits: maxFractionDigits,
    signDisplay: 'negative',
  });
}

/**
 * Reads one part of `digitsInfo`.
 *
 * @param digits - The captured digits, `undefined` when the part is omitted.
 * @param defaultValue - Value of an omitted part.
 * @returns The number of digits.
 */
function parseDigits(digits: string | undefined, defaultValue: number): number {
  return digits === undefined ? defaultValue : Number(digits);
}
