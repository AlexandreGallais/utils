import { words } from './words.ts';

/**
 * Converts a string to CONSTANT_CASE: uppercase words joined with `_`, as in constants and environment
 * variables.
 *
 * @param input - Any identifier or sentence (camelCase, kebab-case, spaces…).
 * @returns The CONSTANT_CASE string; `''` when the input has no word.
 * @example
 * constantCase('maxChannel'); // 'MAX_CHANNEL'
 * constantCase('api-base-url'); // 'API_BASE_URL'
 */
export function constantCase(input: string): string {
  return words(input)
    .map((word) => word.toUpperCase())
    .join('_');
}
