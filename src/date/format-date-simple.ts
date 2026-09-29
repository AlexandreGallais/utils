import { formatDate } from './format-date.ts';

/**
 * Formats a date like `formatDate`, in local time.
 *
 * @param date - The date to format.
 * @param pattern - The pattern, such as `'DD/MM/YYYY HH:mm'`.
 * @returns The formatted date.
 * @simple Local time (the time zone of the browser).
 * @example
 * formatDateSimple(new Date(), 'HH:mm:ss'); // '14:03:27'
 */
export function formatDateSimple(date: Readonly<Date>, pattern: string): string {
  return formatDate(date, pattern, false);
}
