/**
 * A value that is returned directly or through a promise: the result of a callback that may be sync or
 * async.
 *
 * @template T - The value type.
 * @example
 * type Loader = (page: number) => Awaitable<readonly Row[]>;
 */
export type Awaitable<T> = PromiseLike<T> | T;
