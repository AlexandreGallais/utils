import type { RateLimitedFunction } from './rate-limited-function';

/**
 * Delays a function until calls have stopped for a while, then runs it once with the latest arguments.
 *
 * @template TArguments - Parameters of the wrapped function.
 * @param callback - The function to debounce.
 * @param waitMs - Quiet time required before the call, in milliseconds.
 * @returns The debounced function.
 * @example
 * const search = debounce((text: string) => fetchResults(text), 300);
 * input.addEventListener('input', () => search(input.value));
 */
export function debounce<TArguments extends unknown[]>(
  callback: (...callArguments: TArguments) => void,
  waitMs: number,
): RateLimitedFunction<TArguments> {
  let pendingArguments: TArguments | undefined;
  let timer: ReturnType<typeof setTimeout> | undefined;

  function onTimer(): void {
    timer = undefined;
    if (!pendingArguments) {
      return;
    }
    const callArguments = pendingArguments;
    pendingArguments = undefined;
    callback(...callArguments);
  }
  function cancel(): void {
    clearTimeout(timer);
    timer = undefined;
    pendingArguments = undefined;
  }
  function flush(): void {
    clearTimeout(timer);
    onTimer();
  }

  return Object.assign(
    (...callArguments: TArguments): void => {
      pendingArguments = callArguments;
      clearTimeout(timer);
      timer = setTimeout(onTimer, waitMs);
    },
    { cancel, flush },
  );
}
