import { yieldToMain } from './yield-to-main';

/** A function returning the current time, in milliseconds. */
type TimeSource = () => number;

/** Settings of `processInChunks`: slice duration, cancellation and time source. */
export interface ProcessInChunksOptions {
  /** Time spent processing before giving the main thread back, in milliseconds (half a 60 Hz frame by default). */
  readonly budgetMs?: number | null;
  /** Cancels the processing between two items. */
  readonly signal?: AbortSignal | null;
  /** Time source, `performance.now` by default; replace it in tests. */
  readonly now?: TimeSource | null;
}

/** Default time slice: half a 60 Hz frame, leaving the other half to rendering. */
const DEFAULT_BUDGET_MS = 8;

/**
 * Processes a long list without freezing the UI: items are handled for a time budget, then the main thread
 * is given back to the browser (`yieldToMain`) before the next slice. Use it to build thousands of DOM or
 * SVG elements, or to parse a big payload, while the page stays responsive.
 *
 * @template T - Type of the items.
 * @param items - The items to process. Defaults to `[]`.
 * @param callback - Called for each item, in order, with its index.
 * @param options - Time budget per slice, abort signal, time source. Defaults to `{}`.
 * @returns A promise resolved once every item is processed.
 * @rejects {Error} With the signal's reason when `signal` is aborted; the remaining items are skipped.
 * @example
 * await processInChunks(points, (point) => layer.append(createMarker(point)), { signal });
 */
export async function processInChunks<T>(
  items: Iterable<T> | null | undefined,
  callback: (item: T, index: number) => void,
  options?: ProcessInChunksOptions | null,
): Promise<void> {
  const resolvedItems = items ?? [];
  const resolvedOptions = options ?? {};
  const { signal } = resolvedOptions;
  const budgetMs = resolvedOptions.budgetMs ?? DEFAULT_BUDGET_MS;
  const now = resolvedOptions.now ?? ((): number => performance.now());
  let index = 0;
  let sliceStart = now();
  for (const item of resolvedItems) {
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
