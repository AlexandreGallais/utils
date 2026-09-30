import { splitWords } from './split-words';

/**
 * Converts a string to lower-case words separated by spaces, splitting identifiers such as `camelCase`.
 *
 * @param input - The identifier or sentence to convert, in any case style.
 * @returns The words in lower case, separated by single spaces; `''` when there is no word.
 * @example
 * lowerCase('engineRoomTemperature'); // 'engine room temperature'
 * lowerCase('MAX_SPEED'); // 'max speed'
 */
export function lowerCase(input: string): string {
  return splitWords(input)
    .map((word) => word.toLowerCase())
    .join(' ');
}
