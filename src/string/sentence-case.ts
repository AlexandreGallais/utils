import { capitalize } from './capitalize';
import { splitWords } from './split-words';

/**
 * Converts an identifier to a sentence, to turn a key into a label: the first word capitalized, the others in
 * lower case, acronyms kept.
 *
 * @param input - The identifier or sentence to convert, in any case style.
 * @returns The sentence; `''` when the input has no word.
 * @example
 * sentenceCase('engineRoomTemperature'); // 'Engine room temperature'
 * sentenceCase('max_speed_GPS'); // 'Max speed GPS'
 */
export function sentenceCase(input: string): string {
  const sentence = splitWords(input)
    .map((word) => (word === word.toUpperCase() ? word : word.toLowerCase()))
    .join(' ');
  return capitalize(sentence);
}
