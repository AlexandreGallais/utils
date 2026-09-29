/**
 * A rate-limited version of a function, returned by `throttle`, `debounce` and `rafThrottle`: calls may be
 * deferred and coalesced, keeping the latest arguments.
 *
 * @template TArguments - Parameters of the wrapped function.
 */
export type RateLimitedFunction<TArguments extends unknown[]> = ((...callArguments: TArguments) => void) & {
  /** Drops the pending call, if any. */
  cancel(): void;
  /** Runs the pending call now, if any. */
  flush(): void;
};
