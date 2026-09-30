import { streamInChunks } from './stream-in-chunks';

/**
 * Delivers a list chunk by chunk with a pause between chunks, like `streamInChunks`, for `for await`.
 *
 * @template T - Type of the items.
 * @param items - The list to deliver.
 * @param chunkSize - Number of items per chunk, a positive integer.
 * @param intervalMs - Delay between two chunks, in milliseconds.
 * @returns An async generator of chunks.
 * @simple No abort signal.
 * @example
 * for await (const rows of streamInChunksSimple(alarms, 50, 16)) {
 *   table.append(...rows.map(createRow));
 * }
 */
export function streamInChunksSimple<T>(
  items: readonly T[],
  chunkSize: number,
  intervalMs: number,
): AsyncGenerator<T[], void, undefined> {
  return streamInChunks(items, chunkSize, intervalMs, undefined);
}
