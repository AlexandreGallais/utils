import { parseMatchedNumber } from './internal/parse-matched-number.ts';

/** Source of a signed decimal number, `.` or `,` as decimal separator: `-12`, `3.5`, `+0,25`, `.5`. */
const NUMBER_SOURCE = String.raw`[+\-]?(?:\d+(?:[,.]\d+)?|[,.]\d+)`;

const NUMBER_PATTERN = new RegExp(NUMBER_SOURCE, 'v');

/**
 * Extracts the first number of a text: sign and decimals, `.` or `,` as decimal separator. There is no
 * thousands separator and no exponent: `1,234` is read as `1.234`.
 *
 * @param input - Free text, such as a label or a sensor message.
 * @returns The first number found, or `undefined` when there is none.
 * @example
 * extractNumber('Speed: -12,5 kn'); // -12.5
 * extractNumber('n/a'); // undefined
 */
export function extractNumber(input: string): number | undefined {
  const match = NUMBER_PATTERN.exec(input);
  return match ? parseMatchedNumber(match[0]) : undefined;
}
