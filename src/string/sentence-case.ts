import { capitalize } from './capitalize';
import { words } from './words';

/**
 * Converts an identifier to a sentence, to turn a key into a label: the first word capitalized, the others in
 * lower case, acronyms kept.
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
