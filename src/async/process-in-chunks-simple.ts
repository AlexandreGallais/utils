import { processInChunks } from './process-in-chunks.ts';

/**
 * Processes a long list in slices of 8 ms like `processInChunks`, giving the browser a turn between slices.
 *
 * @template T - The item type.
 * @param items - The items to process.
 * @param callback - Called with each item and its index.
 * @returns A promise resolved when every item is processed.
 * @simple Slices of 8 ms, no cancellation.
 * @example
 * await processInChunksSimple(rows, (row) => index.add(row));
 */
export async function processInChunksSimple<T>(
  items: Iterable<T>,
  callback: (item: T, index: number) => void,
): Promise<void> {
  return processInChunks(items, callback, {});
}
