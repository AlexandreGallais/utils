import { words } from './words';

/**
 * Converts a string to lower-case words separated by spaces, splitting identifiers such as `camelCase`.
 *
 * @param input - Any identifier or sentence.
 * @returns The words in lower case, separated by single spaces; `''` when there is no word.
 * @example
 * lowerCase('engineRoomTemperature'); // 'engine room temperature'
 * lowerCase('MAX_SPEED'); // 'max speed'
 */
export function lowerCase(input: string): string {
  return words(input)
    .map((word) => word.toLowerCase())
    .join(' ');
}
