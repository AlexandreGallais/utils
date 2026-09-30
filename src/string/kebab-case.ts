import { words } from './words';

/**
 * Converts a string to kebab-case: lowercase words joined with `-`, as in file names, CSS classes and URLs.
 *
 * @param input - Any identifier or sentence (camelCase, snake_case, spaces…). Defaults to `''`.
 * @returns The kebab-case string; `''` when the input has no word.
 * @example
 * kebabCase('roundToStep'); // 'round-to-step'
 * kebabCase('XMLHttpRequest'); // 'xml-http-request'
 */
export function kebabCase(input?: string | null): string {
  const resolvedInput = input ?? '';
  return words(resolvedInput)
    .map((word) => word.toLowerCase())
    .join('-');
}
