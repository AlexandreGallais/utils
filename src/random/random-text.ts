import { randomInt } from './random-int.ts';

/** Syllables whose combinations read like words of a Latin placeholder text. */
const SYLLABLES = ['lo', 'rem', 'ip', 'sum', 'do', 'lor', 'sit', 'a', 'met', 'con', 'sec', 'te', 'tur', 'el', 'it'];
/** Largest number of syllables in a word. */
const MAX_SYLLABLES = 4;

/**
 * Draws a placeholder text of words, starting with a capital letter, to fill labels and descriptions in tests
 * and mock-ups: long enough to check wrapping and truncation without reading as real content.
 *
 * @param minLength - Smallest length, in characters.
 * @param maxLength - Largest length, in characters; `minLength` for a fixed length.
 * @param random - Source of numbers in [0, 1), such as a seeded generator for reproducible runs.
 * @returns The text: lowercase words separated by single spaces, the first one capitalized, never ending
 * with a space.
 * @throws {RangeError} When the lengths hold no valid integer.
 * @example
 * randomText(20, 40); // 'Remsit lorte amet conse iptur'
 */
export function randomText(minLength: number, maxLength = minLength, random: () => number = Math.random): string {
  const length = randomInt(Math.max(minLength, 0), maxLength, random);
  let text = '';
  while (text.length < length) {
    const syllableCount = randomInt(1, MAX_SYLLABLES, random);
    const word = Array.from({ length: syllableCount }, () => SYLLABLES[randomInt(0, SYLLABLES.length - 1, random)]);
    text += `${word.join('')} `;
  }
  // A space cut at the end is replaced by the letter that follows it in the syllable list, to keep the length.
  const trimmed = text.slice(0, length).replace(/ $/v, 'a');
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}
