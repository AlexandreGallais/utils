import { randomInt } from './random-int.ts';

/** Default alphabet: ASCII letters and digits. */
const ALPHANUMERIC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

/**
 * Draws a string of random characters, to fill a form or a table in tests: identifiers, codes, oversized
 * labels to check truncation.
 *
 * @param minLength - Smallest length, in characters.
 * @param maxLength - Largest length, in characters; `minLength` for a fixed length.
 * @param characters - The alphabet to draw from (an emoji or an accented letter counts as one character).
 * @param random - Source of numbers in [0, 1), such as a seeded generator for reproducible runs.
 * @returns A string of `minLength` to `maxLength` characters of the alphabet.
 * @throws {RangeError} When the lengths hold no valid integer or the alphabet is empty.
 * @example
 * randomString(8); // 'x3Kq9ZbA'
 * randomString(1, 3, 'ABC'); // 'CA'
 */
export function randomString(
  minLength: number,
  maxLength = minLength,
  characters = ALPHANUMERIC,
  random: () => number = Math.random,
): string {
  const segmenter = new Intl.Segmenter();
  const alphabet = Array.from(segmenter.segment(characters), ({ segment }) => segment);
  if (alphabet.length === 0) {
    throw new RangeError('characters must not be empty');
  }
  const length = randomInt(Math.max(minLength, 0), maxLength, random);
  return Array.from({ length }, () => alphabet[Math.floor(random() * alphabet.length)]).join('');
}
