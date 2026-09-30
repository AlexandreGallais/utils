import { measureDuration } from './measure-duration';

/**
 * Runs a function and measures how long it took, like `measureDuration`.
 *
 * @template T - The item type.
 * @param task - The work to measure.
 * @returns The result of the task and its duration in milliseconds.
 * @simple `performance.now()` as the clock.
 * @example
 * const { durationMs } = measureDurationSimple(() => redraw());
 */
export function measureDurationSimple<T>(task: () => T): { readonly result: T; readonly durationMs: number } {
  return measureDuration(task, () => performance.now());
}
