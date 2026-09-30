import type { NonEmptyArray } from '../types';

/**
 * Checks whether an array has an item, and narrows it so that its first item is defined.
 *
 * @template T - The type of the items.
 * @param items - The array to check.
 * @returns `true` when the array has an item.
 * @example
 * if (isNonEmptyArray(samples)) {
 *   const [first] = samples; // a sample, not `undefined`
 * }
 */
export function isNonEmptyArray<T>(items: readonly T[]): items is NonEmptyArray<T> {
  return items.length > 0;
}
