import { withTimeout } from './with-timeout.ts';

/**
 * Rejects when a promise takes too long like `withTimeout`, with a standard message.
 *
 * @template T - The item type.
 * @param promise - The promise to wait for.
 * @param ms - The longest wait, in milliseconds.
 * @returns The value of the promise.
 * @simple Message `Timed out after <ms> ms`.
 * @example
 * const state = await withTimeoutSimple(fetchState(), 5000);
 */
export async function withTimeoutSimple<T>(promise: PromiseLike<T>, ms: number): Promise<T> {
  return withTimeout(promise, ms, `Timed out after ${ms} ms`);
}
