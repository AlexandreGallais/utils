import { capitalize } from './capitalize';
import { words } from './words';

/**
 * Converts an identifier to a human-readable sentence: words separated by spaces, the first capitalized,
 * the others in lower case. Acronyms written in capitals stay in capitals. Use it to turn keys into labels.
 *
 * @param input - Any identifier (camelCase, kebab-case, snake_case…) or sentence. Defaults to `''`.
 * @returns The sentence; `''` when the input has no word.
 * @example
 * sentenceCase('engineRoomTemperature'); // 'Engine room temperature'
 * sentenceCase('max_speed_GPS'); // 'Max speed GPS'
 */
export function sentenceCase(input?: string | null): string {
  const resolvedInput = input ?? '';
  const sentence = words(resolvedInput)
    .map((word) => (word === word.toUpperCase() ? word : word.toLowerCase()))
    .join(' ');
  return capitalize(sentence);
}
