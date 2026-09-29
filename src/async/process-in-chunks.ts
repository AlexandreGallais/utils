import type { ProcessInChunksOptions } from './process-in-chunks-options.ts';
import { yieldToMain } from './yield-to-main.ts';

/** Default time slice: half a 60 Hz frame, leaving the other half to rendering. */
const DEFAULT_BUDGET_MS = 8;

/**
 * Processes a long list without freezing the UI: items are handled for a time budget, then the main thread
 * is given back to the browser (`yieldToMain`) before the next slice. Use it to build thousands of DOM or
 * SVG elements, or to parse a big payload, while the page stays responsive.
 *
 * @template T - Type of the items.
 * @param items - The items to process.
 * @param callback - Called for each item, in order, with its index.
 * @param options - Time budget per slice, abort signal, time source.
 * @returns A promise resolved once every item is processed.
 * @rejects {Error} With the signal's reason when `signal` is aborted; the remaining items are skipped.
 * @example
 * await processInChunks(points, (point) => layer.append(createMarker(point)), { signal });
 */
export async function processInChunks<T>(
  items: Iterable<T>,
  callback: (item: T, index: number) => void,
  options: ProcessInChunksOptions = {},
): Promise<void> {
  const { budgetMs = DEFAULT_BUDGET_MS, signal, now = (): number => performance.now() } = options;
  let index = 0;
  let sliceStart = now();
  for (const item of items) {
    signal?.throwIfAborted();
    if (now() - sliceStart >= budgetMs) {
      // eslint-disable-next-line no-await-in-loop -- yielding between slices is the purpose of the loop.
      await yieldToMain();
      signal?.throwIfAborted();
      sliceStart = now();
    }
    callback(item, index);
    index += 1;
  }
}
