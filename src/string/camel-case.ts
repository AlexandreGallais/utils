import { capitalize } from './capitalize';
import { words } from './words';

/**
 * Converts a string to camelCase: words joined, the first in lower case, the next ones capitalized.
 * Acronyms are treated as words (`XMLHttpRequest` → `xmlHttpRequest`).
 *
 * @param input - Any identifier or sentence (kebab-case, snake_case, spaces…). Defaults to `''`.
 * @returns The camelCase string; `''` when the input has no word.
 * @example
 * camelCase('user-id'); // 'userId'
 * camelCase('XML HTTP request'); // 'xmlHttpRequest'
 */
export function camelCase(input?: string | null): string {
  const resolvedInput = input ?? '';
  return words(resolvedInput)
    .map((word, index) => (index === 0 ? word.toLowerCase() : capitalize(word.toLowerCase())))
    .join('');
}
