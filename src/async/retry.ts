import type { RetryOptions } from './retry-options.ts';
import { sleep } from './sleep.ts';

const DEFAULT_RETRIES = 3;
const DEFAULT_DELAY_MS = 200;
const DEFAULT_BACKOFF = 2;
const DEFAULT_MAX_DELAY_MS = 10_000;

/**
 * Runs an async operation until it succeeds, waiting longer after each failure (exponential backoff): a
 * reconnection to a simulation server, a flaky request.
 *
 * @template T - Type of the result.
 * @param operation - The operation; receives the attempt number, from 1.
 * @param options - Retries, delays, backoff, error filter and abort signal.
 * @returns A promise resolved with the first successful result.
 * @rejects {Error} With the last error once the retries are exhausted or `shouldRetry` refuses, or with the
 * signal's reason when `signal` is aborted.
 * @example
 * const state = await retry(() => fetchState(), { retries: 5, delayMs: 500 });
 */
export async function retry<T>(operation: (attempt: number) => Promise<T>, options: RetryOptions): Promise<T> {
  const {
    retries = DEFAULT_RETRIES,
    delayMs = DEFAULT_DELAY_MS,
    backoff = DEFAULT_BACKOFF,
    maxDelayMs = DEFAULT_MAX_DELAY_MS,
    shouldRetry = (): boolean => true,
    signal,
  } = options;
  let delay = delayMs;
  for (let attempt = 1; ; attempt++) {
    signal?.throwIfAborted();
    try {
      // eslint-disable-next-line no-await-in-loop -- attempts are sequential by nature.
      return await operation(attempt);
    } catch (error: unknown) {
      if (attempt > retries || !shouldRetry(error, attempt)) {
        throw error;
      }
    }
    // eslint-disable-next-line no-await-in-loop -- the wait between attempts is the point.
    await sleep(Math.min(delay, maxDelayMs), signal);
    delay *= backoff;
  }
}
