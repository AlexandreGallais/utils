import { getDateParts } from './get-date-parts.ts';
import type { DateParts } from './date-parts.ts';

/**
 * Splits a date into readable fields like `getDateParts`, in local time.
 *
 * @param date - The date to split.
 * @returns The fields, or `undefined` for an invalid date.
 * @simple Local time (the time zone of the browser).
 * @example
 * getDatePartsSimple(new Date()).hour; // 14
 */
export function getDatePartsSimple(date: Readonly<Date>): DateParts | undefined {
  return getDateParts(date, false);
}
