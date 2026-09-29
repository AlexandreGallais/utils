import { randomBoolean } from './random-boolean.ts';

/** Chance of `true`: one in two. */
const EVEN_CHANCE = 0.5;

/**
 * Draws `true` or `false` with the same chance, like `randomBoolean`.
 *
 * @returns The drawn boolean.
 * @simple Even chance, `Math.random` as the source (not replayable: use the full version with `createSeededRandom` for that).
 * @example
 * randomBooleanSimple(); // true or false
 */
export function randomBooleanSimple(): boolean {
  return randomBoolean(EVEN_CHANCE, Math.random);
}
