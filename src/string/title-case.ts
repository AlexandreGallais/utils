import { capitalize } from './capitalize';
import { splitWords } from './split-words';

/**
 * Converts a string to Title Case: words separated by spaces, each capitalized, acronyms kept.
 *
 * @param input - The identifier or sentence to convert, in any case style.
 * @returns The title; `''` when the input has no word.
 * @example
 * titleCase('engine-room'); // 'Engine Room'
 * titleCase('maxSpeedGPS'); // 'Max Speed GPS'
 */
export function titleCase(input: string): string {
  return splitWords(input)
    .map((word) => (word === word.toUpperCase() ? word : capitalize(word.toLowerCase())))
    .join(' ');
}
