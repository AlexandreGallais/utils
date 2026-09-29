import { randomString } from './random-string.ts';

/**
 * Draws a string of random letters and digits of a fixed length, like `randomString`.
 *
 * @param length - Number of characters.
 * @returns A string of `length` ASCII letters and digits.
 * @throws {RangeError} When `length` is not a non-negative integer.
 * @simple ASCII letters and digits, fixed length, `Math.random` as the source (not replayable: use the full version with `createSeededRandom` for that).
 * @example
 * randomStringSimple(8); // 'x3Kq9ZbA'
 */
export function randomStringSimple(length: number): string {
  return randomString(length, length, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', Math.random);
}
