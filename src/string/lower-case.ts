import { words } from './words';

/**
 * Converts a string to lower-case words separated by spaces, whatever its case style: unlike
 * `toLowerCase()`, it also splits `camelCase`, `kebab-case` and `snake_case` identifiers.
 *
 * @param input - Any identifier or sentence. Defaults to `''`.
 * @returns The words in lower case, separated by single spaces; `''` when there is no word.
 * @example
 * lowerCase('engineRoomTemperature'); // 'engine room temperature'
 * lowerCase('MAX_SPEED'); // 'max speed'
 */
export function lowerCase(input?: string | null): string {
  const resolvedInput = input ?? '';
  return words(resolvedInput)
    .map((word) => word.toLowerCase())
    .join(' ');
}
