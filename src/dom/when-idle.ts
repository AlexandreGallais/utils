/** Delay of the fallback when the browser has no `requestIdleCallback` (Safari before 18.4). */
const FALLBACK_DELAY_MS = 1;

/**
 * Runs a low-priority task when the browser is idle, after the frames being drawn: prefetching, caching,
 * analytics. Falls back to a short timeout where `requestIdleCallback` does not exist.
 *
 * @param task - The work to run.
 * @param timeoutMs - Longest wait before running anyway, even if the browser is still busy.
 * @returns A function that cancels the task if it has not run yet.
 * @example
 * const cancel = whenIdle(() => warmUpFormatters(), 2000);
 */
export function whenIdle(task: () => void, timeoutMs: number): () => void {
  if (typeof requestIdleCallback === 'function') {
    const handle = requestIdleCallback(
      () => {
        task();
      },
      { timeout: timeoutMs },
    );
    return (): void => {
      cancelIdleCallback(handle);
    };
  }
  const timer = setTimeout(task, FALLBACK_DELAY_MS);
  return (): void => {
    clearTimeout(timer);
  };
}
