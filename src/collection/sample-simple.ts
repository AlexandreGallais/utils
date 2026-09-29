import { sample } from './sample.ts';

/**
 * Picks a random item like `sample`.
 *
 * @template T - The item type.
 * @param items - The items to pick from.
 * @returns An item, or `undefined` for an empty list.
 * @simple `Math.random` as the source (not replayable: use the full version with `createSeededRandom` for that).
 * @example
 * sampleSimple(['a', 'b', 'c']); // 'b'
 */
export function sampleSimple<T>(items: readonly T[]): T | undefined {
  return sample(items, Math.random);
}
