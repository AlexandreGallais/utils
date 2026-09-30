import { splitWords } from './split-words';

/**
 * Converts a string to dot.case: lower-case words joined with `.`, as in translation keys and property paths.
 *
 * @param input - The identifier or sentence to convert, in any case style.
 * @returns The dot.case string; `''` when there is no word.
 * @example
 * dotCase('engineRoomTemperature'); // 'engine.room.temperature'
 */
export function dotCase(input: string): string {
  return splitWords(input)
    .map((word) => word.toLowerCase())
    .join('.');
}
