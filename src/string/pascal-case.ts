import { capitalize } from './capitalize';
import { splitWords } from './split-words';

/**
 * Converts a string to PascalCase: words joined, each capitalized, the rest in lower case.
 *
 * @param input - The identifier or sentence to convert, in any case style.
 * @returns The PascalCase string; `''` when the input has no word.
 * @example
 * pascalCase('user-id'); // 'UserId'
 * pascalCase('ring_buffer'); // 'RingBuffer'
 */
export function pascalCase(input: string): string {
  return splitWords(input)
    .map((word) => capitalize(word.toLowerCase()))
    .join('');
}
