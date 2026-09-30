function abortReason(signal: AbortSignal): Error {
  const reason: unknown = signal.reason;
  return reason instanceof Error ? reason : new Error(String(reason));
}

/**
 * Waits for a delay, cancellable with an `AbortSignal` that clears the timer.
 *
 * @param ms - The delay in milliseconds. Defaults to `0`.
 * @param signal - The signal that cancels the wait.
 * @returns A promise resolved once the delay has elapsed.
 * @rejects {Error} With the signal's reason when `signal` is aborted.
 * @example
 * await sleep(100);
 * await sleep(1000, controller.signal); // rejects as soon as controller.abort() is called
 */
export async function sleep(ms = 0, signal?: AbortSignal): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if (signal?.aborted === true) {
      reject(abortReason(signal));
      return;
    }
    const timer = setTimeout(() => {
      signal?.removeEventListener('abort', onAbort);
      resolve();
    }, ms);
    function onAbort(this: AbortSignal): void {
      clearTimeout(timer);
      reject(abortReason(this));
    }
    signal?.addEventListener('abort', onAbort, { once: true });
  });
}
