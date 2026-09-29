import { shuffle } from './shuffle.ts';

/**
 * Returns the items in a random order like `shuffle`.
 *
 * @template T - The item type.
 * @param items - The items to mix.
 * @returns A new array with the same items.
 * @simple `Math.random` as the source (not replayable: use the full version with `createSeededRandom` for that).
 * @example
 * shuffleSimple(playlist);
 */
export function shuffleSimple<T>(items: readonly T[]): T[] {
  return shuffle(items, Math.random);
}
