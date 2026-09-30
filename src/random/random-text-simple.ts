import { randomText } from './random-text';

/**
 * Draws a placeholder text of a fixed length, like `randomText`.
 *
 * @param length - Number of characters.
 * @returns Lowercase words, the first one capitalized.
 * @throws {RangeError} When `length` is not a non-negative integer.
 * @simple Fixed length, `Math.random` as the source (not replayable: use the full version with `createSeededRandom` for that).
 * @example
 * randomTextSimple(30); // 'Remsit lorte amet conse iptur'
 */
export function randomTextSimple(length: number): string {
  return randomText(length, length, Math.random);
}
