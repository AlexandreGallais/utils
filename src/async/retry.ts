import { sleep } from './sleep';

/** Decides whether a failed attempt is worth retrying. */
type RetryPredicate = (error: unknown, attempt: number) => boolean;

/** Settings of `retry`: number of attempts, delays, error filter and cancellation. */
export interface RetryOptions {
  /** Retries after the first failure, so `retries + 1` attempts at most; 3 by default. */
  readonly retries?: number;
  /** Delay before the first retry, in milliseconds; 200 by default. */
  readonly delayMs?: number;
  /** Factor applied to the delay after each retry (exponential backoff); 2 by default, 1 for a fixed delay. */
  readonly backoff?: number;
  /** Longest delay between two attempts, in milliseconds; 10 000 by default. */
  readonly maxDelayMs?: number;
  /** Returns `false` for errors that must not be retried (such as a 4xx response); every error by default. */
  readonly shouldRetry?: RetryPredicate;
  /** Cancels the retries; the pending wait is cleared. */
  readonly signal?: AbortSignal;
}

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
