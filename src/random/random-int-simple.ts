import { randomInt } from './random-int';

/**
 * Draws a random integer between two bounds, both included, like `randomInt`.
 *
 * @param min - Lowest possible value.
 * @param max - Highest possible value.
 * @returns An integer in [min, max].
 * @throws {RangeError} When the bounds hold no integer.
 * @simple `Math.random` as the source (not replayable: use the full version with `createSeededRandom` for that).
 * @example
 * randomIntSimple(1, 6); // a die roll
 */
export function randomIntSimple(min: number, max: number): number {
  return randomInt(min, max, Math.random);
}
