import { memoize } from './memoize';
import type { MemoizedFunction } from './memoized-function';

/** Entries kept before the oldest ones are evicted. */
const MAX_SIZE = 1000;

/**
 * Caches the results of a pure one-argument function like `memoize`, by its argument.
 *
 * @template K - The key type.
 * @template TResult - The result type.
 * @param callback - The pure function to cache, with a single argument used as key.
 * @returns The cached function.
 * @simple Key: the argument itself; 1 000 entries at most.
 * @example
 * const toSlug = memoizeSimple((label: string) => slugify(label));
 */
export function memoizeSimple<K, TResult>(callback: (key: K) => TResult): MemoizedFunction<[key: K], TResult> {
  return memoize(callback, (key) => key, MAX_SIZE);
}
