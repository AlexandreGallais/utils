import { mapConcurrent } from './map-concurrent.ts';

/**
 * Maps a list with an async function, at most `concurrency` calls at a time, like `mapConcurrent`, without cancellation.
 *
 * @template T - The item type.
 * @template U - The result type.
 * @param items - The items to process.
 * @param mapper - Async function called with each item and its index.
 * @param concurrency - Maximum number of calls in flight.
 * @returns The results, in the order of the items.
 * @throws {RangeError} When `concurrency` is not a positive integer.
 * @simple No abort signal.
 * @example
 * const symbols = await mapConcurrentSimple(urls, async (url) => (await fetch(url)).text(), 4);
 */
export async function mapConcurrentSimple<T, U>(
  items: readonly T[],
  mapper: (item: T, index: number) => Promise<U>,
  concurrency: number,
): Promise<U[]> {
  return mapConcurrent(items, async (item, index) => mapper(item, index), concurrency, undefined);
}
