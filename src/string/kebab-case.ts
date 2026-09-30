import { splitWords } from './split-words';

/**
 * Converts a string to kebab-case: lowercase words joined with `-`, as in file names, CSS classes and URLs.
 *
 * @param input - The identifier or sentence to convert, in any case style.
 * @returns The kebab-case string; `''` when the input has no word.
 * @example
 * kebabCase('roundToStep'); // 'round-to-step'
 * kebabCase('XMLHttpRequest'); // 'xml-http-request'
 */
export function kebabCase(input: string): string {
  return splitWords(input)
    .map((word) => word.toLowerCase())
    .join('-');
}
