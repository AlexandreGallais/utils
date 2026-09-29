const MS_PER_MINUTE = 60_000;
const MS_PER_DAY = 86_400_000;

/**
 * Counts the calendar days between two dates, whatever their times: from 23:59 to 00:01 the next day is one
 * day. Daylight saving time does not skew the result.
 *
 * @param later - The later date (an earlier one gives a negative count).
 * @param earlier - The earlier date.
 * @param isUtc - Whether days are UTC days; local days otherwise.
 * @returns The number of day boundaries crossed; `NaN` when a date is invalid.
 * @example
 * differenceInCalendarDays(new Date('2026-10-01T00:01:00Z'), new Date('2026-09-29T23:59:00Z'), true); // 2
 */
export function differenceInCalendarDays(later: Readonly<Date>, earlier: Readonly<Date>, isUtc: boolean): number {
  return dayNumber(later, isUtc) - dayNumber(earlier, isUtc);
}

/**
 * Numbers the calendar day of a date: the count of whole days since 1970-01-01, on the local or UTC clock.
 *
 * @param date - The date whose day is numbered.
 * @param isUtc - Whether to read the day on the UTC clock.
 * @returns The day number; `NaN` for an invalid date.
 */
function dayNumber(date: Readonly<Date>, isUtc: boolean): number {
  // The local wall clock is the UTC time shifted by the time zone offset of that date.
  const offsetMs = isUtc ? 0 : date.getTimezoneOffset() * MS_PER_MINUTE;
  return Math.floor((date.getTime() - offsetMs) / MS_PER_DAY);
}
