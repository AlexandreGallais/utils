import type { RateLimitedFunction } from './rate-limited-function.ts';

/**
 * Limits a function to one call per interval: the first call runs immediately, the next ones are coalesced
 * into a single trailing call with the latest arguments, so the last value is never lost. Use it to
 * process a high-frequency source at a lower, steady rate.
 *
 * @template TArguments - Parameters of the wrapped function.
 * @param callback - The function to rate-limit.
 * @param intervalMs - Minimum delay between two calls, in milliseconds.
 * @returns The rate-limited function; its `cancel` also resets the interval, so the next call runs at once.
 * @example
 * const update = throttle((value: number) => render(value), 100);
 * simulation.on('value', update); // at most 10 renders per second, the last value always rendered
 */
export function throttle<TArguments extends unknown[]>(
  callback: (...callArguments: TArguments) => void,
  intervalMs: number,
): RateLimitedFunction<TArguments> {
  let lastRunTime = -Infinity;
  let pendingArguments: TArguments | undefined;
  let timer: ReturnType<typeof setTimeout> | undefined;

  function run(callArguments: TArguments): void {
    lastRunTime = Date.now();
    pendingArguments = undefined;
    callback(...callArguments);
  }
  function onTimer(): void {
    timer = undefined;
    if (pendingArguments) {
      run(pendingArguments);
    }
  }
  function cancel(): void {
    clearTimeout(timer);
    timer = undefined;
    pendingArguments = undefined;
    lastRunTime = -Infinity;
  }
  function flush(): void {
    clearTimeout(timer);
    onTimer();
  }

  return Object.assign(
    (...callArguments: TArguments): void => {
      const remaining = intervalMs - (Date.now() - lastRunTime);
      if (timer === undefined && remaining <= 0) {
        run(callArguments);
        return;
      }
      pendingArguments = callArguments;
      timer ??= setTimeout(onTimer, remaining);
    },
    { cancel, flush },
  );
}
