/**
 * An array with at least one item, so that its first item is never `undefined`.
 *
 * @template T - The item type.
 * @example
 * function average(values: NonEmptyArray<number>): number;
 */
export type NonEmptyArray<T> = readonly [T, ...T[]];
