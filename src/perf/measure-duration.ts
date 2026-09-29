/**
 * Runs a function and measures how long it took, with the sub-millisecond `performance.now()`: check that a
 * refresh stays within its frame budget, compare two implementations in the console.
 *
 * @template T - The result type.
 * @param task - The work to measure.
 * @param now - Clock in milliseconds, injectable for tests.
 * @returns The result of the task and its duration in milliseconds.
 * @example
 * const { result, durationMs } = measureDuration(() => projectPoints(samples, bounds, plot), () => performance.now());
 * if (durationMs > 4) log.warn(`Projection took ${durationMs} ms`);
 */
export function measureDuration<T>(
  task: () => T,
  now: () => number,
): { readonly result: T; readonly durationMs: number } {
  const start = now();
  const result = task();
  return { result, durationMs: now() - start };
}
