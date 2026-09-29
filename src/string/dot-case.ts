import { words } from './words.ts';

/**
 * Converts a string to dot.case: lower-case words joined with `.`, as in translation keys and property paths.
 *
 * @param input - Any identifier or sentence.
 * @returns The dot.case string; `''` when there is no word.
 * @example
 * dotCase('engineRoomTemperature'); // 'engine.room.temperature'
 */
export function dotCase(input: string): string {
  return words(input)
    .map((word) => word.toLowerCase())
    .join('.');
}
