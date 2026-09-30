/**
 * Waits for a delay, cancellable with an `AbortSignal`: the timer is cleared on abort.
 *
 * @param ms - Delay in milliseconds. Defaults to `0`.
 * @param signal - Optional signal that cancels the wait. Defaults to none.
 * @returns A promise resolved once the delay has elapsed.
 * @rejects {Error} With the signal's reason (an `AbortError` by default) when `signal` is aborted before the
 * delay elapses, or already aborted.
 * @example
 * await sleep(100, undefined);
 * await sleep(1000, controller.signal); // rejects as soon as controller.abort() is called
 */
export async function sleep(ms?: number | null, signal?: AbortSignal | null): Promise<void> {
  const resolvedMs = ms ?? 0;
  const resolvedSignal = signal ?? undefined;
  return new Promise<void>((resolve, reject) => {
    if (resolvedSignal?.aborted === true) {
      reject(abortReason(resolvedSignal));
      return;
    }
    const timer = setTimeout(() => {
      resolvedSignal?.removeEventListener('abort', onAbort);
      resolve();
    }, resolvedMs);
    function onAbort(this: AbortSignal): void {
      clearTimeout(timer);
      reject(abortReason(this));
    }
    resolvedSignal?.addEventListener('abort', onAbort, { once: true });
  });
}

/**
 * Turns the abort reason of a signal into an `Error`, keeping it when it already is one.
 *
 * @param signal - An aborted signal.
 * @returns The error to reject with.
 */
function abortReason(signal: AbortSignal): Error {
  const reason: unknown = signal.reason;
  return reason instanceof Error ? reason : new Error(String(reason));
}
