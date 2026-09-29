import { capitalize } from './capitalize.ts';
import { words } from './words.ts';

/**
 * Converts an identifier to a human-readable sentence: words separated by spaces, the first capitalized,
 * the others in lower case. Acronyms written in capitals stay in capitals. Use it to turn keys into labels.
 *
 * @param input - Any identifier (camelCase, kebab-case, snake_case…) or sentence.
 * @returns The sentence; `''` when the input has no word.
 * @example
 * sentenceCase('engineRoomTemperature'); // 'Engine room temperature'
 * sentenceCase('max_speed_GPS'); // 'Max speed GPS'
 */
export function sentenceCase(input: string): string {
  const sentence = words(input)
    .map((word) => (word === word.toUpperCase() ? word : word.toLowerCase()))
    .join(' ');
  return capitalize(sentence);
}
