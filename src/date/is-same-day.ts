import { differenceInCalendarDays } from './difference-in-calendar-days.ts';

/**
 * Checks whether two dates fall on the same calendar day, in local time or UTC: group log entries by day,
 * show "today" in a list.
 *
 * @param a - A date.
 * @param b - Another date.
 * @param isUtc - Whether days are UTC days; local time otherwise.
 * @returns `true` when both dates have the same year, month and day (`false` when one is invalid).
 * @example
 * isSameDay(new Date('2026-09-29T00:10:00Z'), new Date('2026-09-29T23:50:00Z'), true); // true
 */
export function isSameDay(a: Readonly<Date>, b: Readonly<Date>, isUtc = false): boolean {
  return differenceInCalendarDays(a, b, isUtc) === 0;
}
