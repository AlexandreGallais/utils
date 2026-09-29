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
