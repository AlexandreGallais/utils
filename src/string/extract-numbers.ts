import { parseMatchedNumber } from './internal';

/** Source of a signed decimal number, `.` or `,` as decimal separator: `-12`, `3.5`, `+0,25`, `.5`. */
const NUMBER_SOURCE = String.raw`[+\-]?(?:\d+(?:[,.]\d+)?|[,.]\d+)`;

const NUMBERS_PATTERN = new RegExp(NUMBER_SOURCE, 'gv');

/**
 * Extracts every number of a text, with the rules of `extractNumber`.
 *
 * @param input - Free text.
 * @returns The numbers found, in order; empty when there is none.
 * @example
 * extractNumbers('from 1.5 to -3'); // [1.5, -3]
 */
export function extractNumbers(input: string): number[] {
  return Array.from(input.matchAll(NUMBERS_PATTERN), (match) => parseMatchedNumber(match[0]));
}
