import { retry } from './retry';

/**
 * Retries an async operation like `retry`, with the standard delays.
 *
 * @template T - The item type.
 * @param operation - The async work, called with the attempt number.
 * @returns The first successful result.
 * @simple Three retries, 200 ms then doubling, up to 10 s between tries.
 * @example
 * const state = await retrySimple(() => fetchState());
 */
export async function retrySimple<T>(operation: (attempt: number) => Promise<T>): Promise<T> {
  return retry(operation, {});
}
