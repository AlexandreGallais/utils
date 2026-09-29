import { capitalize } from './capitalize.ts';
import { words } from './words.ts';

/**
 * Converts a string to camelCase: words joined, the first in lower case, the next ones capitalized.
 * Acronyms are treated as words (`XMLHttpRequest` → `xmlHttpRequest`).
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
