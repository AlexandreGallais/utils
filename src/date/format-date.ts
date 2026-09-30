import type { DateParts } from './date-parts';
import { getDateParts } from './get-date-parts';

/** Pattern when none is given: the ISO order, readable. */
const DEFAULT_PATTERN = 'YYYY-MM-DD HH:mm:ss';

const YEAR_WIDTH = 4;
const MILLISECOND_WIDTH = 3;
const TWO_DIGITS = 2;
const NO_PADDING = 1;

/** Tokens, longest first, with the field they write and their zero-padded width (1 for no padding). */
const TOKENS: readonly (readonly [token: string, field: keyof DateParts, width: number])[] = [
  ['YYYY', 'year', YEAR_WIDTH],
  ['SSS', 'millisecond', MILLISECOND_WIDTH],
  ['MM', 'month', TWO_DIGITS],
  ['DD', 'day', TWO_DIGITS],
  ['HH', 'hour', TWO_DIGITS],
  ['mm', 'minute', TWO_DIGITS],
  ['ss', 'second', TWO_DIGITS],
  ['M', 'month', NO_PADDING],
  ['D', 'day', NO_PADDING],
  ['H', 'hour', NO_PADDING],
  ['m', 'minute', NO_PADDING],
  ['s', 'second', NO_PADDING],
];

/**
 * Formats a date with a fixed pattern, independent of the browser's locale: logs, file names, a
 * `DD/MM/YYYY HH:mm` display. Tokens (the same as `parseDateFormat`): `YYYY`, `MM` / `M`, `DD` / `D`,
 * `HH` / `H`, `mm` / `m`, `ss` / `s`, `SSS`; text in square brackets is written as is (`[at] HH:mm`), an
 * unclosed bracket is an ordinary character.
 * For localized month and day names, use `Intl.DateTimeFormat`.
 *
 * @param date - The date to format.
 * @param pattern - The format, such as `'DD/MM/YYYY HH:mm'`. Defaults to `'YYYY-MM-DD HH:mm:ss'`.
 * @param isUtc - Whether to write the fields in UTC; local time otherwise. Defaults to `false`.
 * @returns The formatted date; `''` for an invalid date.
 * @example
 * formatDate(new Date('2026-09-29T14:30:05Z'), 'DD/MM/YYYY HH:mm', true); // '29/09/2026 14:30'
 * formatDate(new Date('2026-09-29T14:30:05Z'), 'YYYY-MM-DD[T]HH:mm:ss', true); // '2026-09-29T14:30:05'
 */
export function formatDate(date: Readonly<Date>, pattern?: string | null, isUtc?: boolean | null): string {
  const resolvedPattern = pattern ?? DEFAULT_PATTERN;
  const resolvedIsUtc = isUtc ?? false;
  const parts = getDateParts(date, resolvedIsUtc);
  if (!parts) {
    return '';
  }
  let result = '';
  let index = 0;
  while (index < resolvedPattern.length) {
    const literalEnd = resolvedPattern.startsWith('[', index) ? resolvedPattern.indexOf(']', index) : -1;
    const token = literalEnd === -1 ? tokenAt(resolvedPattern, index) : undefined;
    if (literalEnd !== -1) {
      result += resolvedPattern.slice(index + 1, literalEnd);
      index = literalEnd + 1;
    } else if (token) {
      const [text, field, width] = token;
      result += String(parts[field]).padStart(width, '0');
      index += text.length;
    } else {
      result += resolvedPattern.charAt(index);
      index += 1;
    }
  }
  return result;
}

/**
 * Finds the token starting at a position of a pattern.
 *
 * @param pattern - The format.
 * @param index - Position in the pattern.
 * @returns The token, or `undefined` for a literal character.
 */
function tokenAt(pattern: string, index: number): (typeof TOKENS)[number] | undefined {
  return TOKENS.find(([token]) => pattern.startsWith(token, index));
}
