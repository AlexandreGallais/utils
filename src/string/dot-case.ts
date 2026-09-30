import { words } from './words';

/**
 * Converts a string to dot.case: lower-case words joined with `.`, as in translation keys and property paths.
 *
 * @param input - Any identifier or sentence. Defaults to `''`.
 * @returns The dot.case string; `''` when there is no word.
 * @example
 * dotCase('engineRoomTemperature'); // 'engine.room.temperature'
 */
export function dotCase(input?: string | null): string {
  const resolvedInput = input ?? '';
  return words(resolvedInput)
    .map((word) => word.toLowerCase())
    .join('.');
}
