/**
 * Computes midnight of the day of a date, in local time or UTC: the start of a daily chart or of a log
 * filter.
 *
 * @param date - Any time of the day.
 * @param isUtc - Whether the day is a UTC day; local time otherwise. Defaults to `false`.
 * @returns A new `Date` at 00:00:00.000 of that day (invalid when `date` is invalid).
 * @example
 * startOfDay(new Date('2026-09-29T14:30:00Z'), true).toISOString(); // '2026-09-29T00:00:00.000Z'
 */
export function startOfDay(date: Readonly<Date>, isUtc?: boolean | null): Date {
  const resolvedIsUtc = isUtc ?? false;
  const result = new Date(date);
  if (resolvedIsUtc) {
    result.setUTCHours(0, 0, 0, 0);
  } else {
    result.setHours(0, 0, 0, 0);
  }
  return result;
}
