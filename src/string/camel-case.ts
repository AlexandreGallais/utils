import { capitalize } from './capitalize';
import { words } from './words';

/**
 * Converts a string to camelCase; acronyms are words (`XMLHttpRequest` → `xmlHttpRequest`).
 *
 * @param input - Any identifier or sentence (kebab-case, snake_case, spaces…).
 * @returns The camelCase string; `''` when the input has no word.
 * @example
 * camelCase('user-id'); // 'userId'
 * camelCase('XML HTTP request'); // 'xmlHttpRequest'
 */
export function camelCase(input: string): string {
  return words(input)
    .map((word, index) => (index === 0 ? word.toLowerCase() : capitalize(word.toLowerCase())))
    .join('');
}
