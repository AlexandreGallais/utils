import { differenceInCalendarDays } from './difference-in-calendar-days.ts';

/**
 * Counts the calendar days between two dates like `differenceInCalendarDays`, in local time.
 *
 * @param later - The later date.
 * @param earlier - The earlier date.
 * @returns The number of local midnights crossed; negative when `later` is before `earlier`.
 * @simple Local time (the time zone of the browser).
 * @example
 * differenceInCalendarDaysSimple(new Date(2026, 0, 16, 0, 1), new Date(2026, 0, 15, 23, 59)); // 1
 */
export function differenceInCalendarDaysSimple(later: Readonly<Date>, earlier: Readonly<Date>): number {
  return differenceInCalendarDays(later, earlier, false);
}
