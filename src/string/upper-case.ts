import { splitWords } from './split-words';

/**
 * Converts a string to upper-case words separated by spaces, splitting identifiers such as `camelCase`.
 *
 * @param input - The identifier or sentence to convert, in any case style.
 * @returns The words in upper case, separated by single spaces; `''` when there is no word.
 * @example
 * upperCase('engineRoomTemperature'); // 'ENGINE ROOM TEMPERATURE'
 * upperCase('max-speed'); // 'MAX SPEED'
 */
export function upperCase(input: string): string {
  return splitWords(input)
    .map((word) => word.toUpperCase())
    .join(' ');
}
