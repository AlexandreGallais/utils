import { randomInt } from './random-int';

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
 * randomText(20, 40, Math.random); // 'Remsit lorte amet conse iptur'
 */
export function randomText(minLength: number, maxLength: number, random: () => number): string {
  const length = randomInt(Math.max(minLength, 0), maxLength, random);
  const words: string[] = [];
  let full = '';
  while (full.length <= length) {
    const syllableCount = randomInt(1, MAX_SYLLABLES, random);
    words.push(
      Array.from({ length: syllableCount }, () => SYLLABLES[randomInt(0, SYLLABLES.length - 1, random)]).join(''),
    );
    full = words.join(' ');
  }
  // A cut right after a word would end with a space: the next letter takes its place, to keep the length.
  const cut = full.charAt(length - 1) === ' ' ? full.slice(0, length - 1) + full.charAt(length) : full.slice(0, length);
  return cut.charAt(0).toUpperCase() + cut.slice(1);
}
