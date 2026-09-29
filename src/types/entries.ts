/**
 * The `[key, value]` pairs of an object type, each key with its own value type: the precise type of
 * `Object.entries`, which widens keys to `string`.
 *
 * @template T - The object type.
 * @example
 * const pairs = Object.entries(limits) as Entries<Limits>;
 */
export type Entries<T> = { [K in keyof T]-?: [K, T[K]] }[keyof T][];
