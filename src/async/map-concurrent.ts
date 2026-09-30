/**
 * Maps a list with an async function, running at most `concurrency` calls at a time: load 500 symbols
 * without opening 500 requests at once. Results keep the order of the items.
 *
 * @template T - Type of the items.
 * @template U - Type of the results.
 * @param items - The items to process. Defaults to `[]`.
 * @param mapper - Async function called with each item, its index and `signal` (to pass on to `fetch`).
 * @param concurrency - Maximum number of calls in flight, a positive integer.
 * @param signal - Cancels the work: once it is aborted, no new call starts. Defaults to none.
 * @returns A promise of the results, in the order of `items`.
 * @throws {RangeError} When `concurrency` is not a positive integer.
 * @rejects {Error} With the first error or the abort reason; calls already started run to completion, no new
 * call starts.
 * @example
 * const controller = new AbortController();
 * const symbols = await mapConcurrent(
 *   symbolUrls,
 *   async (url, _index, signal) => (await fetch(url, { signal })).text(),
 *   4,
 *   controller.signal,
 * );
 */
export async function mapConcurrent<T, U>(
  items: readonly T[] | null | undefined,
  mapper: (item: T, index: number, signal: AbortSignal | undefined) => Promise<U>,
  concurrency: number,
  signal?: AbortSignal | null,
): Promise<U[]> {
  const resolvedItems = items ?? [];
  const resolvedSignal = signal ?? undefined;
  if (!Number.isSafeInteger(concurrency) || concurrency < 1) {
    throw new RangeError(`concurrency must be a positive integer, got ${concurrency}`);
  }
  const results: U[] = [];
  const entries = resolvedItems.entries();
  let failure: { readonly error: unknown } | undefined;

  async function worker(): Promise<void> {
    for (const [index, item] of entries) {
      if (failure) {
        return;
      }
      if (resolvedSignal?.aborted === true) {
        failure ??= { error: resolvedSignal.reason };
        return;
      }
      try {
        // eslint-disable-next-line no-await-in-loop -- each worker processes its items one at a time.
        results[index] = await mapper(item, index, resolvedSignal);
      } catch (error: unknown) {
        failure ??= { error };
      }
    }
  }

  // Every worker pulls from the same iterator, so each item is processed once.
  await Promise.all(Array.from({ length: Math.min(concurrency, resolvedItems.length) }, worker));
  if (failure) {
    throw failure.error;
  }
  return results;
}
