import { startOfDay } from './start-of-day.ts';

/**
 * Returns the midnight that starts the day of a date like `startOfDay`, in local time.
 *
 * @param date - Any moment of the day.
 * @returns A new date at local midnight.
 * @simple Local time (the time zone of the browser).
 * @example
 * startOfDaySimple(new Date()); // today at 00:00 local
 */
export function startOfDaySimple(date: Readonly<Date>): Date {
  return startOfDay(date, false);
}
