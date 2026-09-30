import { isSameDay } from './is-same-day';

/**
 * Checks whether two dates fall on the same calendar day like `isSameDay`, in local time.
 *
 * @param a - A first date.
 * @param b - A second date.
 * @returns `true` when both are on the same local day.
 * @simple Local time (the time zone of the browser).
 * @example
 * isSameDaySimple(alarm.time, new Date()); // true when the alarm is from today
 */
export function isSameDaySimple(a: Readonly<Date>, b: Readonly<Date>): boolean {
  return isSameDay(a, b, false);
}
