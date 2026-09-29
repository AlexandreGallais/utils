import { sleep } from './sleep.ts';

/**
 * Waits for a delay like `sleep`, without cancellation.
 *
 * @param ms - The delay, in milliseconds.
 * @returns A promise resolved after the delay.
 * @simple No abort signal.
 * @example
 * await sleepSimple(100);
 */
export async function sleepSimple(ms: number): Promise<void> {
  return sleep(ms, undefined);
}
