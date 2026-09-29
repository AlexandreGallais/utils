import { chunk } from '../collection/chunk.ts';
import { sleep } from './sleep.ts';

/**
 * Delivers a list progressively: the first chunk at once, then one chunk every `intervalMs`. Iterate it with
 * `for await` to display a long list little by little, or to feed a slow consumer at a steady pace.
 *
 * @template T - Type of the items.
 * @param items - The list to deliver.
 * @param chunkSize - Number of items per chunk, a positive integer.
 * @param intervalMs - Delay between two chunks, in milliseconds.
 * @param signal - Stops the delivery; the pending wait is cancelled.
 * @returns An async generator of chunks.
 * @throws {RangeError} When `chunkSize` is not a positive integer (on the first iteration).
 * @yields {T[]} The next chunk of items, in order.
 * @rejects {Error} With the signal's reason when `signal` is aborted during a wait.
 * @example
 * for await (const rows of streamInChunks(alarms, 50, 16, undefined)) {
 *   table.append(...rows.map(createRow)); // 50 rows per frame
 * }
 */
export async function* streamInChunks<T>(
  items: readonly T[],
  chunkSize: number,
  intervalMs: number,
  signal: AbortSignal | undefined,
): AsyncGenerator<T[], void, undefined> {
  const chunks = chunk(items, chunkSize);
  for (const [index, part] of chunks.entries()) {
    if (index > 0) {
      // eslint-disable-next-line no-await-in-loop -- waiting between chunks is the purpose of the loop.
      await sleep(intervalMs, signal);
    }
    yield part;
  }
}
