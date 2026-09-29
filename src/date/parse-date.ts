import { isValidDate } from './is-valid-date.ts';

/** A timestamp in milliseconds, possibly negative, as text. */
const TIMESTAMP_PATTERN = /^-?\d+$/v;
/** ISO 8601 pieces that `Date` parses reliably across browsers: date, time, UTC offset. */
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/v;
const ISO_TIME_PATTERN = /^[ T]\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?$/v;
const ISO_OFFSET_PATTERN = /(?:Z|[+\-]\d{2}:?\d{2})$/v;
/** Length of `YYYY-MM-DD`. */
const ISO_DATE_LENGTH = 10;

/**
 * Reads a date from the forms a backend or a storage sends: an ISO 8601 text (`2026-09-29`,
 * `2026-09-29T14:30:00Z`, `2026-09-29 14:30`), a timestamp in milliseconds (number or digits), or a `Date`.
 * Other texts are rejected rather than guessed; for `DD/MM/YYYY` and similar, use `parseDateFormat`. An ISO
 * date without time is read at midnight UTC, a date-time without offset in local time, like `Date` does.
 *
 * @param input - The date to read.
 * @returns A new valid `Date`, or `undefined` when the input is not a supported date.
 * @example
 * parseDate('2026-09-29T14:30:00Z')?.toISOString(); // '2026-09-29T14:30:00.000Z'
 * parseDate(1_790_000_000_000); // Date
 * parseDate('29/09/2026'); // undefined, see parseDateFormat
 */
export function parseDate(input: Date | number | string): Date | undefined {
  let date: Date | undefined;
  if (typeof input === 'number') {
    date = new Date(input);
  } else if (typeof input === 'string') {
    const text = input.trim();
    if (TIMESTAMP_PATTERN.test(text)) {
      date = new Date(Number(text));
    } else if (isIsoText(text)) {
      date = new Date(text.replace(' ', 'T'));
    }
  } else {
    date = new Date(input);
  }
  return isValidDate(date) ? date : undefined;
}

/**
 * Checks the shape of an ISO 8601 date or date-time, before handing it to `Date`.
 *
 * @param text - A trimmed text.
 * @returns `true` for `YYYY-MM-DD`, optionally followed by a time and a UTC offset.
 */
function isIsoText(text: string): boolean {
  const date = text.slice(0, ISO_DATE_LENGTH);
  const rest = text.slice(ISO_DATE_LENGTH);
  const time = rest.replace(ISO_OFFSET_PATTERN, '');
  return ISO_DATE_PATTERN.test(date) && (rest === '' || ISO_TIME_PATTERN.test(time));
}
