import type { MemoizedFunction } from './memoized-function';

/**
 * Caches the results of a pure function by key: a call with an already seen key returns the stored result
 * without running the function. The key is computed by `getKey`. For a value recomputed at each
 * refresh from inputs that rarely change, `memoizeLast` needs no memory at all.
 *
 * @template TArguments - Parameters of the wrapped function.
 * @template TResult - Return type of the wrapped function.
 * @param callback - A pure function.
 * @param getKey - Computes the cache key from the arguments, such as `(id) => id`.
 * @param maxSize - Maximum number of cached results, a positive integer.
 * @returns The memoized function, with its read-only `cache` and `clear()`.
 * @throws {RangeError} When `maxSize` is not a positive integer.
 * @cached Results by key in a `Map`, `maxSize` entries (the oldest evicted first), emptied by `clear()`.
 * @example
 * const getSymbolPath = memoize((type: string) => buildSymbolPath(type));
 * getSymbolPath('pump'); // built
 * getSymbolPath('pump'); // from the cache
 */
export function memoize<TArguments extends unknown[], TResult>(
  callback: (...callArguments: TArguments) => TResult,
  getKey: (...callArguments: TArguments) => unknown,
  maxSize: number,
): MemoizedFunction<TArguments, TResult> {
  if (!Number.isSafeInteger(maxSize) || maxSize < 1) {
    throw new RangeError(`maxSize must be a positive integer, got ${maxSize}`);
  }
  const cache = new Map<unknown, TResult>();
  function memoized(...callArguments: TArguments): TResult {
    const key = getKey(...callArguments);
    if (cache.has(key)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- `has` guarantees a stored result, possibly `undefined`.
      return cache.get(key) as TResult;
    }
    const result = callback(...callArguments);
    if (cache.size >= maxSize) {
      // A `Map` iterates in insertion order: the first key is the oldest.
      const [oldest] = cache.keys();
      cache.delete(oldest);
    }
    cache.set(key, result);
    return result;
  }
  function clear(): void {
    cache.clear();
  }
  return Object.assign(memoized, { cache, clear });
}
