import { randomBetween } from './random-between';

/**
 * Draws a random number in an interval like `randomBetween`.
 *
 * @param min - Lower bound, included.
 * @param max - Upper bound, excluded.
 * @returns A number in [min, max[.
 * @simple `Math.random` as the source (not replayable: use the full version with `createSeededRandom` for that).
 * @example
 * randomBetweenSimple(-0.5, 0.5); // sensor noise
 */
export function randomBetweenSimple(min: number, max: number): number {
  return randomBetween(min, max, Math.random);
}
