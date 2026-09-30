/** Pattern when none is given: the ISO order, readable. */
const DEFAULT_PATTERN = 'YYYY-MM-DD HH:mm:ss';

/** Date fields a format can set. */
interface Fields {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  millisecond: number;
}

/** A pattern token: the field it sets and how many digits it reads (fixed, or 1–2 for short tokens). */
interface Token {
  readonly field: keyof Fields;
  readonly minDigits: number;
  readonly maxDigits: number;
}

/** Tokens, longest first so `YYYY` wins over a literal `Y` and `MM` over `M`. */
const TOKENS: readonly (readonly [text: string, token: Token])[] = [
  ['YYYY', { field: 'year', minDigits: 4, maxDigits: 4 }],
  ['SSS', { field: 'millisecond', minDigits: 3, maxDigits: 3 }],
  ['MM', { field: 'month', minDigits: 2, maxDigits: 2 }],
  ['DD', { field: 'day', minDigits: 2, maxDigits: 2 }],
  ['HH', { field: 'hour', minDigits: 2, maxDigits: 2 }],
  ['mm', { field: 'minute', minDigits: 2, maxDigits: 2 }],
  ['ss', { field: 'second', minDigits: 2, maxDigits: 2 }],
  ['M', { field: 'month', minDigits: 1, maxDigits: 2 }],
  ['D', { field: 'day', minDigits: 1, maxDigits: 2 }],
  ['H', { field: 'hour', minDigits: 1, maxDigits: 2 }],
  ['m', { field: 'minute', minDigits: 1, maxDigits: 2 }],
  ['s', { field: 'second', minDigits: 1, maxDigits: 2 }],
];

const DIGIT_PATTERN = /^\d$/v;
/** Value of the fields a format leaves out: 1 January 1970, midnight. */
const EPOCH_YEAR = 1970;
const MONTHS = 12;
const MAX_DAY = 31;
const HOURS = 24;
const MINUTES_OR_SECONDS = 60;

/**
 * Reads a date written in a known format, such as a French `DD/MM/YYYY HH:mm` or an American `MM/DD/YYYY`.
 * Tokens: `YYYY` year, `MM` / `M` month, `DD` / `D` day, `HH` / `H` hours (0–23), `mm` / `m` minutes,
 * `ss` / `s` seconds, `SSS` milliseconds; short tokens accept one or two digits, any other character must
 * appear as is. Impossible dates (31 February, 25:00) are rejected.
 *
 * @param input - The text to read; surrounding spaces are ignored.
 * @param pattern - The format of the text, such as `'DD/MM/YYYY HH:mm'`. Defaults to `'YYYY-MM-DD HH:mm:ss'`.
 * @param isUtc - Whether the fields are in UTC; local time otherwise. Defaults to `false`.
 * @returns A new `Date`, or `undefined` when the text does not match the format or is not a real date.
 * @example
 * parseDateFormat('29/09/2026 14:30', 'DD/MM/YYYY HH:mm', false); // 29 September 2026, 14:30 local time
 * parseDateFormat('9/29/2026', 'M/D/YYYY', true)?.toISOString(); // '2026-09-29T00:00:00.000Z'
 * parseDateFormat('31/02/2026', 'DD/MM/YYYY', false); // undefined
 */
export function parseDateFormat(input: string, pattern?: string | null, isUtc?: boolean | null): Date | undefined {
  const resolvedPattern = pattern ?? DEFAULT_PATTERN;
  const resolvedIsUtc = isUtc ?? false;
  const fields = readFields(input.trim(), resolvedPattern);
  if (!fields) {
    return undefined;
  }
  const { year, month, day, hour, minute, second, millisecond } = fields;
  if (!areFieldsInRange(fields)) {
    return undefined;
  }
  const date = resolvedIsUtc
    ? new Date(Date.UTC(year, month - 1, day, hour, minute, second, millisecond))
    : new Date(year, month - 1, day, hour, minute, second, millisecond);
  // Years 0–99 would be read as 1900–1999.
  if (resolvedIsUtc) {
    date.setUTCFullYear(year);
  } else {
    date.setFullYear(year);
  }
  // A day past the end of the month rolls over (31 February → 3 March): the date must keep its day.
  const actualDay = resolvedIsUtc ? date.getUTCDate() : date.getDate();
  return actualDay === day ? date : undefined;
}

/**
 * Reads the fields of a text along a pattern.
 *
 * @param text - The trimmed text.
 * @param pattern - The format.
 * @returns The fields (unset ones at their neutral value), or `undefined` when the text does not match.
 */
function readFields(text: string, pattern: string): Fields | undefined {
  const fields: Fields = { year: EPOCH_YEAR, month: 1, day: 1, hour: 0, minute: 0, second: 0, millisecond: 0 };
  let textIndex = 0;
  let patternIndex = 0;
  while (patternIndex < pattern.length) {
    const match = tokenAt(pattern, patternIndex);
    if (match) {
      const [token, { field, minDigits, maxDigits }] = match;
      const digits = readDigits(text, textIndex, maxDigits);
      if (digits.length < minDigits) {
        return undefined;
      }
      fields[field] = Number(digits);
      textIndex += digits.length;
      patternIndex += token.length;
    } else if (text[textIndex] === pattern[patternIndex]) {
      textIndex += 1;
      patternIndex += 1;
    } else {
      return undefined;
    }
  }
  return textIndex === text.length ? fields : undefined;
}

/**
 * Reads consecutive digits.
 *
 * @param text - The text being parsed.
 * @param start - Index of the first digit.
 * @param maxDigits - Most digits to read.
 * @returns The digits read, possibly none.
 */
function readDigits(text: string, start: number, maxDigits: number): string {
  let end = start;
  while (end < start + maxDigits && DIGIT_PATTERN.test(text.charAt(end))) {
    end += 1;
  }
  return text.slice(start, end);
}

/**
 * Finds the token starting at a position of a pattern.
 *
 * @param pattern - The format.
 * @param index - Position in the pattern.
 * @returns The token text and its definition, or `undefined` for a literal character.
 */
function tokenAt(pattern: string, index: number): (typeof TOKENS)[number] | undefined {
  return TOKENS.find(([token]) => pattern.startsWith(token, index));
}

/**
 * Checks the fields against their calendar and clock ranges (the day against 31 only).
 *
 * @param fields - The fields read from the text.
 * @returns `true` when every field is in its range.
 */
function areFieldsInRange(fields: Readonly<Fields>): boolean {
  const ranges: readonly (readonly [value: number, min: number, max: number])[] = [
    [fields.month, 1, MONTHS],
    [fields.day, 1, MAX_DAY],
    [fields.hour, 0, HOURS - 1],
    [fields.minute, 0, MINUTES_OR_SECONDS - 1],
    [fields.second, 0, MINUTES_OR_SECONDS - 1],
  ];
  return ranges.every(([value, min, max]) => value >= min && value <= max);
}
