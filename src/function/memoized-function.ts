/**
 * A memoized function returned by `memoize`: same call signature, plus control over its cache.
 *
 * @template TArguments - Parameters of the wrapped function.
 * @template TResult - Return type of the wrapped function.
 */
export type MemoizedFunction<TArguments extends unknown[], TResult> = ((...callArguments: TArguments) => TResult) & {
  /** The cached results by key, read-only (`cache.size`, `cache.has(key)`). */
  readonly cache: ReadonlyMap<unknown, TResult>;
  /** Empties the cache. */
  clear(): void;
};
