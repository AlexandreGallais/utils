import { TimeoutError } from './timeout-error.ts';

/**
 * Races a promise against a delay. The underlying operation is not cancelled on timeout: give it an
 * `AbortSignal` for that.
 *
 * @template T - Type of the promised value.
 * @param promise - The operation to wait for.
 * @param ms - Maximum wait, in milliseconds.
 * @param message - Message of the `TimeoutError`; defaults to `Timed out after <ms> ms`.
 * @returns A promise settled like `promise` when it settles in time.
 * @rejects {TimeoutError} When `promise` has not settled after `ms` milliseconds.
 * @example
 * const response = await withTimeout(fetch(url), 5000);
 */
export async function withTimeout<T>(promise: PromiseLike<T>, ms: number, message?: string): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      reject(new TimeoutError(message ?? `Timed out after ${ms} ms`));
    }, ms);
  });
  try {
    return await Promise.race([promise, timeout]);
  } finally {
    clearTimeout(timer);
  }
}
