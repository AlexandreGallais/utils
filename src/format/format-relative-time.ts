/** Relative time formatters by locale and style: creating an `Intl.RelativeTimeFormat` costs more than using it. */
const relativeTimeFormatters = new Map<string, Intl.RelativeTimeFormat>();

/** Milliseconds per second. */
const SECOND_MS = 1000;
/** Milliseconds per minute. */
const MINUTE_MS = 60_000;
/** Milliseconds per hour. */
const HOUR_MS = 3_600_000;
/** Milliseconds per day. */
const DAY_MS = 86_400_000;
/** Milliseconds per week. */
const WEEK_MS = 604_800_000;
/** The units above a second, largest first, with their length in milliseconds. */
const UNITS: readonly (readonly [unit: Intl.RelativeTimeFormatUnit, ms: number])[] = [
  ['week', WEEK_MS],
  ['day', DAY_MS],
  ['hour', HOUR_MS],
  ['minute', MINUTE_MS],
];

/**
 * Formats a time offset in words with the rules of a locale, in the largest unit that fits (seconds to
 * weeks): `'5 minutes ago'`, `'in 2 hours'`, `'il y a 3 jours'`. Formatters are cached per locale and style.
 *
 * @param offsetMs - The offset from now: negative in the past, positive in the future.
 * @param locale - BCP 47 locale, such as `'fr-FR'`.
 * @param numeric - `'auto'` for words such as "yesterday" and "now", `'always'` for "1 day ago".
 * @returns The offset in words, rounded to the unit.
 * @example
 * formatRelativeTime(alarm.time - Date.now(), 'en-US'); // '5 minutes ago'
 * formatRelativeTime(-86_400_000, 'fr-FR'); // 'hier'
 */
export function formatRelativeTime(
  offsetMs: number,
  locale: string,
  numeric: Intl.RelativeTimeFormatNumeric = 'auto',
): string {
  const key = `${locale}|${numeric}`;
  let formatter = relativeTimeFormatters.get(key);
  if (!formatter) {
    formatter = new Intl.RelativeTimeFormat(locale, { numeric });
    relativeTimeFormatters.set(key, formatter);
  }
  const [unit, unitMs] = UNITS.find(([, ms]) => Math.abs(offsetMs) >= ms) ?? ['second', SECOND_MS];
  return formatter.format(Math.round(offsetMs / unitMs), unit);
}
