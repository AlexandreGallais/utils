import type { NonEmptyArray } from '../types';

/**
 * Checks that an array has at least one item, and narrows it so that its first item is typed as defined.
 *
 * @template T - The item type.
 * @param items - The array to check.
 * @returns `true` when the array has an item.
 * @example
 * if (isNonEmptyArray(samples)) {
 *   const [first] = samples; // typed as a sample, not `undefined`
 * }
 */
export function isNonEmptyArray<T>(items: readonly T[]): items is NonEmptyArray<T> {
  return items.length > 0;
}
