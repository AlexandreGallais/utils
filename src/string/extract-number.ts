import { parseMatchedNumber } from './internal';

const NUMBER_SOURCE = String.raw`[+\-]?(?:\d+(?:[,.]\d+)?|[,.]\d+)`;

const NUMBER_PATTERN = new RegExp(NUMBER_SOURCE, 'v');

/**
 * Extracts the first number of a text, with `.` or `,` before the decimals: `1,234` is `1.234`.
 *
 * @param input - A text, such as a label or a sensor message.
 * @returns The first number; `undefined` when there is none.
 * @example
 * extractNumber('Speed: -12,5 kn'); // -12.5
 * extractNumber('n/a'); // undefined
 */
export function extractNumber(input: string): number | undefined {
  const match = NUMBER_PATTERN.exec(input);
  return match ? parseMatchedNumber(match[0]) : undefined;
}
