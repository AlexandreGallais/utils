import { capitalize } from './capitalize';
import { words } from './words';

/**
 * Converts a string to Train-Case: capitalized words joined with `-`, as in HTTP header names.
 *
 * @param input - Any identifier or sentence.
 * @returns The Train-Case string; `''` when there is no word.
 * @example
 * trainCase('contentType'); // 'Content-Type'
 * trainCase('x_request_id'); // 'X-Request-Id'
 */
export function trainCase(input: string): string {
  return words(input)
    .map((word) => capitalize(word.toLowerCase()))
    .join('-');
}
