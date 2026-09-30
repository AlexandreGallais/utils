import { capitalize } from './capitalize';
import { splitWords } from './split-words';

/**
 * Converts a string to camelCase; acronyms are words (`XMLHttpRequest` → `xmlHttpRequest`).
 *
 * @param input - The identifier or sentence to convert, in any case style.
 * @returns The camelCase string; `''` when the input has no word.
 * @example
 * camelCase('user-id'); // 'userId'
 * camelCase('XML HTTP request'); // 'xmlHttpRequest'
 */
export function camelCase(input: string): string {
  return splitWords(input)
    .map((word, index) => (index === 0 ? word.toLowerCase() : capitalize(word.toLowerCase())))
    .join('');
}
