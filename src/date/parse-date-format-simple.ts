import { parseDateFormat } from './parse-date-format';

/**
 * Reads a date written in a known pattern like `parseDateFormat`, in local time.
 *
 * @param input - The text to read, such as `'15/01/2026'`.
 * @param pattern - The pattern of the text, such as `'DD/MM/YYYY'`.
 * @returns The date, or `undefined` when the text does not match.
 * @simple Local time (the time zone of the browser).
 * @example
 * parseDateFormatSimple('15/01/2026 09:05', 'DD/MM/YYYY HH:mm'); // 15 January 2026, 09:05 local
 */
export function parseDateFormatSimple(input: string, pattern: string): Date | undefined {
  return parseDateFormat(input, pattern, false);
}
