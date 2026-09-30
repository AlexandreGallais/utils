import { splitWords } from './split-words';

/**
 * Converts a string to snake_case: lowercase words joined with `_`, as in database columns and JSON keys.
 *
 * @param input - The identifier or sentence to convert, in any case style.
 * @returns The snake_case string; `''` when the input has no word.
 * @example
 * snakeCase('userId'); // 'user_id'
 * snakeCase('Speed in knots'); // 'speed_in_knots'
 */
export function snakeCase(input: string): string {
  return splitWords(input)
    .map((word) => word.toLowerCase())
    .join('_');
}
