import type { DateParts } from './date-parts.ts';

const MS_PER_DAY = 86_400_000;
/** `Date#getDay()` numbers Sunday 0; ISO numbers it 7. */
const ISO_SUNDAY = 7;

/**
 * Reads every field of a date at once, in local time or UTC, with the numbering people use: months from 1,
 * ISO weekdays from 1 (Monday) to 7 (Sunday), plus the day of the year.
 *
 * @param date - The date to read.
 * @param isUtc - Whether to read the fields in UTC; local time otherwise.
 * @returns The fields, or `undefined` for an invalid date.
 * @example
 * getDateParts(new Date('2026-09-29T14:30:05.123Z'), true);
 * // { year: 2026, month: 9, day: 29, hour: 14, minute: 30, second: 5, millisecond: 123,
 * //   weekday: 2, dayOfYear: 272, timestamp: 1790692205123 }
 */
export function getDateParts(date: Readonly<Date>, isUtc = false): DateParts | undefined {
  const timestamp = date.getTime();
  if (Number.isNaN(timestamp)) {
    return undefined;
  }
  const year = isUtc ? date.getUTCFullYear() : date.getFullYear();
  const month = isUtc ? date.getUTCMonth() : date.getMonth();
  const day = isUtc ? date.getUTCDate() : date.getDate();
  const weekday = isUtc ? date.getUTCDay() : date.getDay();
  // Days are counted on UTC calendar dates, so daylight saving time does not shift them.
  const dayOfYear = (Date.UTC(year, month, day) - Date.UTC(year, 0, 1)) / MS_PER_DAY + 1;
  return {
    year,
    month: month + 1,
    day,
    hour: isUtc ? date.getUTCHours() : date.getHours(),
    minute: isUtc ? date.getUTCMinutes() : date.getMinutes(),
    second: isUtc ? date.getUTCSeconds() : date.getSeconds(),
    millisecond: isUtc ? date.getUTCMilliseconds() : date.getMilliseconds(),
    weekday: weekday === 0 ? ISO_SUNDAY : weekday,
    dayOfYear,
    timestamp,
  };
}
