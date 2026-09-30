import { words } from './words';

/**
 * Converts a string to snake_case: lowercase words joined with `_`, as in database columns and JSON keys.
 *
 * @param input - Any identifier or sentence (camelCase, kebab-case, spaces…).
 * @returns The snake_case string; `''` when the input has no word.
 * @example
 * snakeCase('userId'); // 'user_id'
 * snakeCase('Speed in knots'); // 'speed_in_knots'
 */
export function snakeCase(input: string): string {
  return words(input)
    .map((word) => word.toLowerCase())
    .join('_');
}
