import { addDays } from './add-days';

/**
 * Adds calendar days to a date like `addDays`, in local time (the clock time is kept across daylight saving changes).
 *
 * @param date - The starting date.
 * @param days - Days to add; negative to go back.
 * @returns A new date.
 * @simple Local time (the time zone of the browser).
 * @example
 * addDaysSimple(new Date(2026, 0, 31), 1); // 1 February 2026
 */
export function addDaysSimple(date: Readonly<Date>, days: number): Date {
  return addDays(date, days, false);
}
