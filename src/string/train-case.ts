import { capitalize } from './capitalize';
import { splitWords } from './split-words';

/**
 * Converts a string to Train-Case: capitalized words joined with `-`, as in HTTP header names.
 *
 * @param input - The identifier or sentence to convert, in any case style.
 * @returns The Train-Case string; `''` when there is no word.
 * @example
 * trainCase('contentType'); // 'Content-Type'
 * trainCase('x_request_id'); // 'X-Request-Id'
 */
export function trainCase(input: string): string {
  return splitWords(input)
    .map((word) => capitalize(word.toLowerCase()))
    .join('-');
}
