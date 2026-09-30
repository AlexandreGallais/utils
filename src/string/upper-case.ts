import { words } from './words';

/**
 * Converts a string to upper-case words separated by spaces, whatever its case style: unlike
 * `toUpperCase()`, it also splits `camelCase`, `kebab-case` and `snake_case` identifiers.
 *
 * @param input - Any identifier or sentence. Defaults to `''`.
 * @returns The words in upper case, separated by single spaces; `''` when there is no word.
 * @example
 * upperCase('engineRoomTemperature'); // 'ENGINE ROOM TEMPERATURE'
 * upperCase('max-speed'); // 'MAX SPEED'
 */
export function upperCase(input?: string | null): string {
  const resolvedInput = input ?? '';
  return words(resolvedInput)
    .map((word) => word.toUpperCase())
    .join(' ');
}
