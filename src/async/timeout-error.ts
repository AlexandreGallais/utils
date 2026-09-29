/**
 * Error thrown by `withTimeout` when the wrapped promise takes too long.
 *
 * @example
 * try {
 *   await withTimeout(fetch(url), 5000);
 * } catch (error) {
 *   if (error instanceof TimeoutError) {
 *     showRetryButton();
 *   }
 * }
 */
export class TimeoutError extends Error {
  /** Error name, as shown in stack traces: `'TimeoutError'`. */
  public override readonly name = 'TimeoutError';
}
