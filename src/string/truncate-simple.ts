import { truncate } from './truncate';

/**
 * Shortens a text to a maximum length like `truncate`, ending with an ellipsis.
 *
 * @param input - The text to shorten.
 * @param maxLength - Maximum length of the result, ellipsis included.
 * @returns The text, shortened when needed.
 * @throws {RangeError} When `maxLength` is not a non-negative integer.
 * @simple Ellipsis `…` (one character).
 * @example
 * truncateSimple('Main engine temperature', 12); // 'Main engine…'
 */
export function truncateSimple(input: string, maxLength: number): string {
  return truncate(input, maxLength, '…');
}
