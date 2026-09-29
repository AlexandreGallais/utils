import { words } from './words.ts';

/**
 * Converts a string to kebab-case: lowercase words joined with `-`, as in file names, CSS classes and URLs.
 *
 * @param input - Any identifier or sentence (camelCase, snake_case, spaces…).
 * @returns The kebab-case string; `''` when the input has no word.
 * @example
 * kebabCase('roundToStep'); // 'round-to-step'
 * kebabCase('XMLHttpRequest'); // 'xml-http-request'
 */
export function kebabCase(input: string): string {
  return words(input)
    .map((word) => word.toLowerCase())
    .join('-');
}
