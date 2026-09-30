import { capitalize } from './capitalize';
import { words } from './words';

/**
 * Converts a string to PascalCase: words joined, each capitalized, the rest in lower case.
 *
 * @param input - Any identifier or sentence (kebab-case, snake_case, spaces…).
 * @returns The PascalCase string; `''` when the input has no word.
 * @example
 * pascalCase('user-id'); // 'UserId'
 * pascalCase('ring_buffer'); // 'RingBuffer'
 */
export function pascalCase(input: string): string {
  return words(input)
    .map((word) => capitalize(word.toLowerCase()))
    .join('');
}
